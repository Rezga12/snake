
export class Point{

    constructor(x,y,id){



        this.object = document.createElement('div');
        this.object.classList.add('point');
        this.object.id = id;

        this.X = x;
        this.Y = y;

        this.isFood = id === -1;
    }

    get X(){
        return this.x;
    }

    set X(x){
        this.object.style.marginLeft = 'calc(var(--point-size) * ' + x + ')';
        this.x = x;
    }

    get Y(){
        return this.y;
    }

    set Y(y){
        this.object.style.marginTop = 'calc(var(--point-size) * ' + y + ')';
        this.y = y;
    }

}

export class Food{

    constructor(world){

        this.world = world;

        let coordinates = this.randomCoordinate();

        this.point = new Point(coordinates.X,coordinates.Y,-1);
        this.world.addPoint(this.point);

        this.point.object.classList.add('food');
    }

    randomCoordinate(){

        let x = Math.round((Math.random() * 1000)) % this.world.size();
        let y = Math.round((Math.random() * 1000)) % this.world.size();

        while(this.world.grid[x][y] !== null){
            x = Math.round((Math.random() * 1000)) % this.world.size();
            y = Math.round((Math.random() * 1000)) % this.world.size();
        }

        return {X:x,Y:y};
    }

    reappear(){

        let coordinates = this.randomCoordinate();

        this.world.replacePoint(coordinates.X,coordinates.Y,this.point);

    }

}
