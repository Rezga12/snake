import {Food, Point} from "./points.js";
import * as constant from "./constants.js";

export class Snake{

    constructor(world){
        this.body = [new Point(1,1,0)];
        this.direction = constant.RIGHT;
        this.possibleDirection = constant.RIGHT;

        this.world = world;
        this.world.addBody(this.body);

        this.food = new Food(this.world);
    }

    size(){
        return this.body.length;
    }

    move(){

        this.checkDirection();

        let oldHead = this.body[this.size() - 1];
        let newX = oldHead.X + this.direction.Dx;
        let newY = oldHead.Y + this.direction.Dy;

        if(this.world.checkCoordinates(newX,newY) === constant.WALL){
            newX = newX - this.direction.Dx * this.world.size();
            newY = newY - this.direction.Dy * this.world.size();
        }

        if(this.world.checkCoordinates(newX,newY) === constant.FOOD){

            let returnValue = 10;

            if(this.size() < (this.world.size() * this.world.size()) - 1) {
                this.food.reappear();
                returnValue = 1;
            }

            let newHead = new Point(newX,newY,this.size());
            this.body.push(newHead);
            this.world.addPoint(newHead);

            return returnValue;
        }

        if(this.world.checkCoordinates(newX,newY) === constant.FREE){
            let newHead = this.body[0];
            this.body.shift();
            this.body.push(newHead);
            this.world.replacePoint(newX,newY,newHead);

            return 0;
        }



        return -1;
    }

    changeDirection(dir) {

        this.possibleDirection = dir;
    }

    checkDirection(){

        if(this.possibleDirection.Dx + this.direction.Dx === 0 && this.possibleDirection.Dy + this.direction.Dy === 0){
            return;
        }

        this.direction = this.possibleDirection;

    }


}