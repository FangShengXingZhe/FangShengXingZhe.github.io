class Enemy {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 5;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    update(deltaTime){
        // movement
        this.x -=  this.game.speed * this.speedX ; //要改
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }else {
            this.frameTimer += deltaTime;
        }
        //是否離開螢幕
        if (this.x + this.width < 0)
            this.markedForDeletion = true;

    }
    draw(context){
        //if(this.game.debug) context.strokeRect(this.x,this.y,this.width, this.height);
        context.drawImage(this.image , this.positionLocationX + this.frameX * this.width, 0 , this.width , this.height , this.x , this.y , this.width , this.height);
    }
}

export class FlyingEnemy extends Enemy {
    //bird
    constructor(game){
        super();
        this.game = game;
        this.width =  92;
        this.height = 69;
        this.positionLocationX = 259;
        this.x = this.game.width + Math.random() * this.game.width * 0.7;
        this.y = ( Math.random() < 0.5) ? (this.game.height - this.game.groundMargin - this.height - this.game.player.stateheight.RUNNING) : this.game.height - this.game.groundMargin - this.height - this.game.player.stateheight.SQUATING;
        this.speedX = 0.2;
        this.speedY = 0;
        this.maxFrame = 1;
        this.image = document.getElementById('source');
        //this.angle = 0;
        //this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime){
        super.update(deltaTime);
        //this.angle += this.va;
        //this.y += Math.sin(this.angle);
    }
}

export class GroundEnemy1 extends Enemy {
    //Cactus
    constructor(game){
        super();
        this.game = game;
        this.width = 34;
        this.height = 70;
        this.positionLocationX = 445;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('source');
        this.speedX = 0.2;
        this.speedY = 0;
        this.maxFrame = 0;

    }
}

export class GroundEnemy2 extends Enemy {
    //Cactus
    constructor(game){
        super();
        this.game = game;
        this.width = 68;
        this.height = 70;
        this.positionLocationX = 479;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('source');
        this.speedX = 0.2;
        this.speedY = 0;
        this.maxFrame = 0;

    }
}

export class GroundEnemy3 extends Enemy {
    //Cactus
    constructor(game){
        super();
        this.game = game;
        this.width = 102;
        this.height = 70;
        this.positionLocationX = 547;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('source');
        this.speedX = 0.2;
        this.speedY = 0;
        this.maxFrame = 0;

    }
}

export class GroundEnemy4 extends Enemy {
    //Cactus
    constructor(game){
        super();
        this.game = game;
        this.width = 50;
        this.height = 100;
        this.positionLocationX = 651;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('source');
        this.speedX = 0.2;
        this.speedY = 0;
        this.maxFrame = 0;

    }
}

export class GroundEnemy5 extends Enemy {
    //Cactus
    constructor(game){
        super();
        this.game = game;
        this.width = 50;
        this.height = 100;
        this.positionLocationX = 701;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('source');
        this.speedX = 0.2;
        this.speedY = 0;
        this.maxFrame = 0;

    }
}

export class GroundEnemy6 extends Enemy {
    //Cactus
    constructor(game){
        super();
        this.game = game;
        this.width = 150;
        this.height = 100;
        this.positionLocationX = 801;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('source');
        this.speedX = 0.2;
        this.speedY = 0;
        this.maxFrame = 0;

    }
}


