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

    
    world.gravity.y = 2;
}

function draw() {
    new Canvas(600, 400);

    bg.x = 300;
    bg.y = 200;
    image(bgImg, 300, 200, 600, 400);

    bird.x = 300;
}