export class InputHandler {
    constructor(game){
        this.game = game;
        this.keys = [];
        this.start = false;
        
        window.addEventListener('keydown' , e =>{
            console.log(e.key ,this.keys);
            if ((  e.key === 'ArrowDown' ||
                   e.key === 'ArrowUp' 
                )&& this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
                this.start = true;
                this.game.debug = false;
            }
        });
        window.addEventListener('keyup' , e =>{
            if (   e.key === 'ArrowDown' ||
                   e.key === 'ArrowUp'
               ){
                this.keys.splice(this.keys.indexOf(e.key) , 1);
            }
        });
    }
}