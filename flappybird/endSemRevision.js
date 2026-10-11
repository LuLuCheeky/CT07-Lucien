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
    
    world.gravity.y = 4;
}

function draw() {
    new Canvas(400, 600);

    image(bgImg, 0, 0, 400, 600);

    bird.x = 200;

    if (mouse.presses()){
        bird.y += -3;
    }
}