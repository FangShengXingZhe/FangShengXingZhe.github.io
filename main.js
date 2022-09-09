import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy , GroundEnemy1 , GroundEnemy2 , GroundEnemy3, GroundEnemy4 , GroundEnemy5 , GroundEnemy6} from './enemies.js';
import { UI } from './UI.js';

window.addEventListener('load' , function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 380;

    class Game {
        constructor(width, height){ 
            this.width  = width;
            this.height = height;
            this.groundMargin = 35;
            this.speed = 0;
            this.maxSpeed = 5;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 4000;
            this.debug = true;
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 2000;
            this.gameOver = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            
        }
        update(deltaTime){
            if(this.input.start){
                this.time += deltaTime;
  
                if((this.time * 0.001).toFixed(1) % 5 === 0){
                    this.speed += 3; 
                    this.enemyInterval -= 30; 
                }
                
                if( this.player.maxSpeed > 400){
                    this.speed = 400;
                    this.enemyInterval = 500;
                } 
                
            }
            
            
            this.background.update(deltaTime,this.input.start);
            this.player.update(this.input.keys , deltaTime);
            //handleEnemies
            if(this.input.start){
                if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
                } else {
                    this.enemyTimer += deltaTime;
                }
                this.enemies.forEach(enemy =>{
                    enemy.update(deltaTime);
                    if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy) , 1);
                });
            }
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy =>{
                enemy.draw(context);
            });
            this.UI.draw(context);
            
        }
        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.2){
                this.enemies.push(new GroundEnemy1(this));
            }
            else if(this.speed > 0 && Math.random() < 0.4){
                this.enemies.push(new FlyingEnemy(this));
            }
            else if(this.speed > 0 && Math.random() < 0.6){
                this.enemies.push(new GroundEnemy3(this));
            }
            else if(this.speed > 0 && Math.random() < 0.7){
                this.enemies.push(new GroundEnemy4(this));
            }
            else if(this.speed > 0 && Math.random() < 0.8){
                this.enemies.push(new GroundEnemy5(this));
            }
            else if(this.speed > 0 && Math.random() < 0.9){
                this.enemies.push(new GroundEnemy6(this));
            }
            else{
                this.enemies.push(new GroundEnemy2(this));
            }
            
        }
    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;

    function animate(timeStamp){
        
        const deltaTime = timeStamp - lastTime; //speed

        lastTime = timeStamp;
        ctx.clearRect( 0,0, canvas.width , canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver)requestAnimationFrame(animate);

        
        if(game.gameOver){
            window.addEventListener('keydown' , e =>{
            if ((  e.key === 'ArrowDown' ||
                   e.key === 'ArrowUp'  
                )){
                location.reload();
            }
            });
        }
    }
    animate(0);

});

