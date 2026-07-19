let bird, floor;
let flapMidImg, bg, base;


function setup() {
    createCanvas(400, 600);
    background(255);
    bird = new Sprite();
    bird.x = width / 2;
    bird.y = 200;
    bird.width = 30;
    bird.hieght = 30;
    bird.img = flap
}


function draw() {    
}


function preload() {
    flapMidImg = loadImage("assets/yellowbird-midflap.png");
    bg = loadImage("assets/background-day.png");
    base = loadImage("assets/base.png");
}