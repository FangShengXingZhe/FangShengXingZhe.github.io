class Layer { //一個 連續的 背景類型 ex:土
    constructor(game ,sx, sy, width, height, x, y, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.sx = sx;
        this.sy = sy;
        this.x = x;
        this.y = this.game.height - y;
    }
    update(){
        if (this.x < -this.width){
            this.x = -this.game.speed * this.speedModifier;
        }
        else{
            this.x -= this.game.speed * this.speedModifier;
        }
    }
    draw(context){
        context.drawImage(this.image, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.sx, this.sy, this.width, this.height, this.x + this.width, this.y, this.width, this.height);
    }
}

class RandomLayer {
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
        this.x -= this.speedX * this.game.speed;
        this.y += this.speedY;
        
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }else {
            this.frameTimer += deltaTime;
        }
        if (this.x + this.width < 0)
            this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.image , this.positionLocationX + this.frameX * this.width, this.frameY , this.width , this.height , this.x , this.y , this.width , this. height);
    }
}

class CloudBackground extends RandomLayer {
    constructor(game){
        super();
        this.game = game;
        this.width =  96;
        this.height = 28;
        this.positionLocationX = 163;
        this.frameY = 5;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = 0.05;
        this.speedY = 0;
        this.maxFrame = 0;
        this.image = document.getElementById('source');
    }
    update(deltaTime){
        super.update(deltaTime);       
    }
}

export class Background{
    constructor(game){
    this.game = game;
    this.randomlayerTimer = 0;
    this.randomlayerInterval = 5600;
    this.randomlayers = [];
    this.layerimageSource = document.getElementById('source');

    this.layer0 = new Layer(this.game,    0,  103, 2400,   25,    0,    55,   0.2, this.layerimageSource);
    this.backgroundLayers = [this.layer0 ];//, this.randomLayer0
    }
    update(deltaTime , start){
        this.backgroundLayers.forEach(layer =>{
            layer.update();
        });

        //handleRandomLayer
        if(start){
            if(this.randomlayerTimer > this.randomlayerInterval){
                this.addRandomLayer();
                this.randomlayerTimer = 0;
            } else {
                this.randomlayerTimer += deltaTime;
            }
            this.randomlayers.forEach(randomlayer =>{
            randomlayer.update(deltaTime);
            if (randomlayer.markedForDeletion) this.randomlayers.splice(this.randomlayers.indexOf(randomlayer) , 1);
        });
        }
    }
    draw(context){
        this.backgroundLayers.forEach(layer =>{
            layer.draw(context);
        });
        this.randomlayers.forEach(randomlayer =>{
            randomlayer.draw(context);
        });
    }
    addRandomLayer(){
        this.randomlayers.push(new CloudBackground(this.game));
    }

}
