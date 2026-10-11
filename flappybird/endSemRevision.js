let bird, bg;

function preload() {
    birdImg = loadImage("assets/bluebird-midflap.png");
    bgImg = loadImage("assets/background-night.png");
}

function setup() {
    new Canvas(600, 400);

    bird = new Sprite;
    bird.img = birdImg;
    bird.collider = "dynamic";

    bg = new Sprite;
    bg.img = bgImg;
    bg.collider = "static";
    
    world.gravity.y = 2;
}

function draw() {
    new Canvas(600, 400);

    bird.x = 300;

    bg.x = 300;
    bg.y = 200;
}