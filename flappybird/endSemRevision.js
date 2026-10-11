let bird, bg;

function preload() {
    birdImg = loadImage("assets/bluebird-midflap.png");
    bgImg = loadImage("assets/background-night.png");
}

function setup() {
    new Canvas(400, 600);

    bird = new Sprite;
    bird.img = birdImg;
    bird.collider = "dynamic";
    bird.mass = 10;
    
    world.gravity.y = 2;
}

function draw() {
    new Canvas(400, 600);

    image(bgImg, 0, 0, 400, 600);

    bird.x = 200;
}