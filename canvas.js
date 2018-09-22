import * as constant from "./constants.js";

export class SnakeCanvas{

    constructor(size){

        document.querySelector('html').setAttribute('style','--point-size: calc(75vh / ' + size +')');

        this.container = document.getElementById('container');

        this.grid = SnakeCanvas.createMatrix(size);

    }

    addPoint(point){

        this.container.appendChild(point.object);
        this.grid[point.X][point.Y] = point;
    }

    size(){
        return this.grid.length;
    }

    static createMatrix(size){

        let result = [];
        for(var i=0; i<size; i++) {
            result[i] = new Array(size);
            for(var j=0;j<size;j++){
                result[i][j] = null;
            }
        }

        return result;
    }

    addBody(body){

        body.forEach((point) => {this.addPoint(point)});

    }

    replacePoint(x,y,point){

        this.grid[point.X][point.Y] = null;

        this.grid[x][y] = point;
        point.X = x;
        point.Y = y;

    }

    checkCoordinates(x,y){

        if(x >= this.grid.length || y >= this.grid.length || y < 0 || x < 0){
            return constant.WALL;
        }

        if(this.grid[x][y] == null){
            return constant.FREE;
        }

        if(this.grid[x][y].isFood){
            return constant.FOOD;
        }

        return constant.BODY;

    }


}
