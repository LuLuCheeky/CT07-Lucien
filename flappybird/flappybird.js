let bird, floor;
let flapMidImg, bg, base;


function setup() {
    createCanvas(400, 600);
    background(255);
    bird = new Sprite();
    bird.x = width / 2;
    bird.y = 350;
    bird.width = 30;
    bird.height = 30;
    bird.img = flapMidImg;

    bird.collider = "dynamic";
    bird.mass = 2;
    bird.drag = 0.02;
    bird.bounciness = 0.9;
    world.gravity.y = 10;

    floor = new Sprite();
    floor.x = 200;
    floor.y = height - 20;
    floor.width = 400;
    floor.height = 125;
    floor.collider = "static";
    floor.img = base;
}


function draw() {    
    image(bg, 0, 0, width, height);

    if (kb.presses("space")) {
        bird.vel.y = -2.5;
        bird.sleeping = false;
    }
}


function preload() {
    flapMidImg = loadImage("assets/yellowbird-midflap.png");
    bg = loadImage("assets/background-day.png");
    base = loadImage("assets/base.png");
}