import { BasicShape } from "./BasicShape.js";

export class Circle extends BasicShape{

    constructor(x,y, radius, ctx){
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fill();
    }

}