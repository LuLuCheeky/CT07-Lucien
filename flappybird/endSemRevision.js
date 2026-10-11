let bird, bg;

function preload() {
    birdImg = loadImage("assets/bluebird-midflap.png");
    bgImg = loadImage("assets/background-night.png");
}

function setup() {
    new Canvas(600, 400);

    new Spritebird;
    bird.x = 300;
    bird.img = birdImg;
}