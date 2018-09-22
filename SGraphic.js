import * as constant from './constants.js'
import {SnakeCanvas} from './canvas.js'
import {Snake} from './snake.js'

class Game{

    constructor(){

        this.scoreBoard = document.getElementById('score');
        this.speedBoard = document.getElementById('speed');

        this.title = document.getElementById('title');

        this.score = 0;

        this.started = false;
        this.initialized = true;

        this.play = () => {

            let move = this.snake.move();

            if(move === 1){

                this.score += Math.round(this.speed * 10);
                this.speed += 0.2;

                this.scoreBoard.innerHTML = this.score;
                this.speedBoard.innerHTML = this.speed.toPrecision(2);
            }

            if(move === -1){
                this.gameOver(constant.LOSS);
                return;
            }

            if(move === 10){
                this.gameOver(constant.WIN);
                return;
            }

            window.setTimeout(this.play,1000 / this.speed);
        }



    }

    init(initSpeed,size){

        this.world =  new SnakeCanvas(size);
        this.snake = new Snake(this.world);
        this.speed = initSpeed;
        this.speedBoard.innerHTML = this.speed;
    }

    gameOver(result){
        if(result === constant.WIN){
            document.querySelector('html').style.background = 'white';
            document.querySelectorAll('div').forEach((key) => {key.style.color = 'black';});
            document.querySelectorAll('.point').forEach((key) => {key.style.background = 'black';});
            document.getElementById('container').style.borderColor = 'white';
            this.title.innerHTML = 'YOU WIn MAN';
        }

        if(result === constant.LOSS){
            document.querySelector('html').style.background = 'black';
            document.querySelectorAll('div').forEach((key) => {key.style.color = 'white';});
            document.querySelectorAll('.point').forEach((key) => {key.style.background = 'white';});
            document.getElementById('container').style.borderColor = 'black';
            this.title.innerHTML = 'Is This Loss??';

        }
    }
}




document.querySelector('body').addEventListener("keydown",function(e){

    if(game.started === false && game.initialized === true) {
        game.play();
        game.started = true;
    } else{
        let a =e.keyCode;
        switch(e.key){

            case 'ArrowLeft': game.snake.changeDirection(constant.LEFT);
                return;

            case 'ArrowUp': game.snake.changeDirection(constant.UP);
                return;

            case 'ArrowDown': game.snake.changeDirection(constant.DOWN);
                return;

            case 'ArrowRight': game.snake.changeDirection(constant.RIGHT);
                return;

            default: return;
        }
    }

});


class Menu{

    constructor(game){

        this.game = game;

    }

    addListeners(){
        this.regularGameButton = document.getElementById('regular');
        this.superGameButton = document.getElementById('super');

        this.graphicMenu = document.getElementById('menu');
        this.graphicGame = document.getElementById('game');

        this.backButton = document.getElementById('back');

        this.regularGameButton.onclick = () => {this.initGame(3.0,25);};
        this.superGameButton.onclick = () => {this.initGame(4,3);};
        this.backButton.onclick = () => {location.reload()};
    }

    initGame(speed,size){

        this.game.speed = speed;

        this.game.init(speed,size);
        this.game.initialized = true;

        this.fadeOut(this.graphicMenu,() => {this.fadeIn(this.graphicGame);});
    }

    fadeOut(element,callback = function(){}){

        let op = 1.0;
        let sub = 0.005;

        let id = setInterval(function(){

            console.log(sub);

            if(op <= 0.0){
                element.style.display = 'none';
                clearInterval(id);
                callback();
            }else{
                op -= sub;
                element.style.opacity = op;
            }

        },5);
    }


    fadeIn(element,callback = function(){}){

        element.classList.remove('game');
        element.style.opacity = 0;

        let op = 0.0;
        let sub = 0.005;

        let id = setInterval(function(){

            if(op >= 1.0){
                clearInterval(id);
                callback();
            }else{
                op += sub;
                element.style.opacity = op;
            }

        },4);

    }
}


let game = new Game();
let menu = new Menu(game);

menu.addListeners();














