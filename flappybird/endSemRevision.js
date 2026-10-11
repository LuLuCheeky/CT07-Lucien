let bird, bg;

function preload() {
    birdImg = loadImage("assets/bluebird-midflap.png");
    bgImg = loadImage("assets/background-night.png");
}

function setup() {
    new Canvas(600, 400);

    bird = new Sprite;
    bird.img = birdImg;
}

function draw() {
    bird.x = 300;
    
}