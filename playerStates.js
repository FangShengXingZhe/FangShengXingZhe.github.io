const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    SQUATING: 4,
    DIEING: 5,
}

const stateWidth = {
    SITTING: 88,
    RUNNING: 88,
    JUMPING: 88,
    FALLING: 88,
    SQUATING: 118,
    DIEING: 88,
}

export const stateHeight = {
    SITTING: 94,
    RUNNING: 94,
    JUMPING: 94,
    FALLING: 94,
    SQUATING: 60,
    DIEING: 94,
}



class State {
    constructor(state , game) {
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State {
    constructor(game) {
        super('SITTING' , game);
    }
    enter() {
        this.game.player.positionLocationX = 1677;
        this.game.player.frameX = 0; //
        this.game.player.frameY = 0; //
        this.game.player.width = stateWidth.SITTING; //
        this.game.player.height = stateHeight.SITTING; //
        this.game.player.groundMargin = 35;
        this.game.player.maxFrame = 1; //
    }
    handleInput(input) {
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.game.player.setState(states.RUNNING, 1);

        } else if (input.includes('ArrowDown')) {
            this.game.player.setState(states.SQUATING ,1);
            
        } else if (input.includes('ArrowUp')) {
            this.game.player.setState(states.JUMPING, 1);
        }

        if(this.game.gameOver){
            this.game.player.setState(states.DIEING, 1);
        }

    }
}

export class Running extends State {
    constructor(game) {
        super('RUNNING' ,game);
    }
    enter() {
        this.game.player.positionLocationX = 1853;
        this.game.player.frameX = 0; //
        this.game.player.frameY = 0; //
        this.game.player.width = stateWidth.RUNNING; //
        this.game.player.height = stateHeight.RUNNING; //
        this.game.player.groundMargin = 35;
        this.game.player.maxFrame = 1; //
    }
    handleInput(input) {
        //console.log(this.game.player.onGround());
        if (input.includes('ArrowDown') && this.game.player.onGround()) {
            this.game.player.setState(states.SQUATING ,1);
        } else if (input.includes('ArrowUp')) {
            this.game.player.setState(states.JUMPING, 1);
        }

        if(this.game.gameOver){
            this.game.player.setState(states.DIEING, 1);
        }

    }
}

export class Jumping extends State {
    constructor(game) {
        super('JUMPING' , game);
    }
    enter() {
        if (this.game.player.onGround()) this.game.player.vy -= 12.2;
        this.game.player.positionLocationX = 1677;
        this.game.player.frameX = 0; //
        this.game.player.frameY = 0; //
        this.game.player.width = stateWidth.JUMPING; //
        this.game.player.height = stateHeight.JUMPING; //
        this.game.player.groundMargin = 35;
        this.game.player.maxFrame = 0; //
        //console.log(this.game.player.onGround());
    }
    handleInput(input) {
        if (this.game.player.vy > this.game.player.weight) {
        //if (this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
        }

        if(this.game.gameOver){
            this.game.player.setState(states.DIEING, 1);
        }
    }
}

export class Falling extends State {
    constructor(game) {
        super('FALLING',game);
    }
    enter() {
        this.game.player.positionLocationX = 1677;
        this.game.player.frameX = 0; //
        this.game.player.frameY = 0; //
        this.game.player.width = stateWidth.FALLING; //
        this.game.player.height = stateHeight.FALLING; //
        this.game.player.groundMargin = 35;
        this.game.player.maxFrame = 0; //
    }
    handleInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        }

        if(this.game.gameOver){
            this.game.player.setState(states.DIEING, 1);
        }

    }
}

export class Squating extends State {
    constructor(game){
        super('SQUATING' , game);
    } 
    enter(){
        this.game.player.positionLocationX = 2205;
        this.game.player.frameX = 0; //
        this.game.player.frameY = 35; //
        this.game.player.width = stateWidth.SQUATING; //
        this.game.player.height = stateHeight.SQUATING; //
        this.game.player.maxFrame = 1; //
        this.game.player.y += stateHeight.RUNNING - stateHeight.SQUATING ; //

    }
    handleInput(input){
        
        if(input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING , 1); 
        } else{this.game.player.vy += 3;
            window.addEventListener('keyup' ,a =>  {
                this.game.player.setState(states.FALLING, 1);    
        });}

        if(this.game.gameOver){
            this.game.player.setState(states.DIEING, 1);
        }
    }
}

export class Dieing extends State {
    constructor(game){
        super('DIEING' , game);
    } 
    enter(){
        this.game.player.positionLocationX = 2029;
        this.game.player.frameX = 0; //
        this.game.player.frameY = 0; //
        this.game.player.width = stateWidth.DIEING; //
        this.game.player.height = stateHeight.DIEING; //
        this.game.player.maxFrame = 0; //
    }
    handleInput(input){
        if(input.includes('ArrowUp')){
            this.game.player.setState(states.SITTING , 1); 
        }
    }
}
