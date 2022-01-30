
import { Particle } from "../../js/shapes/Particle.js";

var canvas = document.getElementById("particle_window");
var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

const NUMBER_OF_PARTICLES = 800;
const MAX_RADIUS_OF_PARTICLE = 15;
const MIN_RADIUS_OF_PARTICLE = 3;
const SUPER_MAX_PARTICLE_RADIUS = 30;
const RANGE_OF_INTERACTIVITY = 50;
const CHANGE_RADIUS_BY = 1;
const MAX_SPEED = 3;
var particles  = [];
var colorPallete = ['#ACACAC', '#CDD1CC', '#E2C547', '#C2DDC8', '#99BFB3'];

var mouse = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

function updateAnimation(){
    ctx.clearRect(0,0,innerWidth, innerHeight);
    for(var i = 0;i < NUMBER_OF_PARTICLES;i++){
        particles[i].draw();
    }
}

function calcDistance(x1, x2, y1, y2){
    var diffX = x1 - x2;
    var diffY = y1 - y2;
    return Math.floor(Math.sqrt(diffX*diffX + diffY * diffY));
}

function interactWithParticle(){
    try{
        var distance = calcDistance(this.x, mouse.x, this.y, mouse.y);

        if(distance <= RANGE_OF_INTERACTIVITY){
            if(this.radius < SUPER_MAX_PARTICLE_RADIUS){
                this.radius += CHANGE_RADIUS_BY;
            }
            
        }
        else{
            if(this.radius > this.orginal_radius){
                this.radius -= CHANGE_RADIUS_BY;
            }
        }
        
    }
    catch(err){
        console.log(err);
    }
    
}

function animate(){
    requestAnimationFrame(animate);
    updateAnimation();
}

function init(){

    for(var i = 0;i<NUMBER_OF_PARTICLES;i++){
        var calcRadius = Math.ceil(Math.random() * MAX_RADIUS_OF_PARTICLE) + MIN_RADIUS_OF_PARTICLE;
        if(calcRadius > MAX_RADIUS_OF_PARTICLE)calcRadius = MAX_RADIUS_OF_PARTICLE;
        var newParticle = new Particle(
            Math.floor( (Math.random() * (innerWidth - MAX_RADIUS_OF_PARTICLE)) + MAX_RADIUS_OF_PARTICLE),
            Math.floor( (Math.random() * (innerHeight - MAX_RADIUS_OF_PARTICLE)) + MAX_RADIUS_OF_PARTICLE),
            Math.random() - 0.5,
            (Math.random() - 0.5),
            calcRadius,
            colorPallete[Math.floor(Math.random() * colorPallete.length)],
            innerWidth,
            innerHeight,
            ctx
        );
        newParticle.interactivity = interactWithParticle;
        particles.push(newParticle);
    }
    animate();
}

init();