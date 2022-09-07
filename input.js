export class InputHandler {
    constructor(game){
        this.game = game;
        this.keys = [];
        this.start = false;
        
        window.addEventListener('keydown' , e =>{
            console.log(e.key ,this.keys);
            if ((  e.key === 'ArrowDown' ||
                   e.key === 'ArrowUp'   //||
                   //e.key === 'ArrowLeft' ||
                   //e.key === 'ArrowRight'||
                   //e.key === 'Enter'
                )&& this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
                this.start = true;
                this.game.debug = false;
            }// else if(e.key === 'd') this.game.debug = !this.game.debug;
        });
        window.addEventListener('keyup' , e =>{
            if (   e.key === 'ArrowDown' ||
                   e.key === 'ArrowUp'   //||
                   //e.key === 'ArrowLeft' ||
                   //e.key === 'ArrowRight'||
                   //e.key === 'Enter'
               ){
                this.keys.splice(this.keys.indexOf(e.key) , 1);
                this.start = true;
            }
            console.log(e.key ,this.keys);
        });
    }
}