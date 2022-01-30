import { BasicShape } from "./BasicShape.js";

export class Particle extends BasicShape{

    constructor(x, y, dx, dy, radius, color, windowWidth, windowHeight, ctx){
        super();
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.radius = radius;
        this.orginal_radius = radius;
        this.color = color;
        this.ctx = ctx;
        this.interactivity = () => {}
    }

    draw(){
        try{
            this.updateParticlePosition();
            this.interactivity();
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
        catch(err){
            console.log(err);
        }
    }

    updateParticlePosition(){
        if((this.x - this.radius) + this.dx <= 0 || (this.x + this.radius) + this.dx >= this.windowWidth){
            this.dx = -this.dx;
        }

        if((this.y - this.radius) + this.dy <= 0 || (this.y + this.radius) + this.dy >= this.windowHeight){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
    }

}