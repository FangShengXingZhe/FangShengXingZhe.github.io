export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'red';
        context.showBlur = 0;
        context.font = this.fontSize +'px '+this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        //context.fillText('Score: ' + this.game.score , this.game.width - 300,50)
         //timer
         context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
         context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1) , this.game.width - 300 , 50);//80
         //gameOver
         if(this.game.gameOver){
            context.textAlign = 'center'; 
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText('GameOverㄏㄏ' , this.game.width * 0.5 , this.game.height * 0.5);
         }
         context.restore();
    }
}