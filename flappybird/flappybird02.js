let bird, floor;
let flapMidImg, flapUpImg, flapDownImg, bg, base;
let pipeGroup;
let pipe, bottomPipe;

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

    pipeGroup = new Group();
}


function draw() {    
    image(bg, 0, 0, width, height);

    if (kb.presses("space") || kb.presses("w") || mouseIsPressed) {
        bird.vel.y = -3;
        bird.sleeping = false;
    }

    if (bird.vel.y < 0) {
        bird.img = flapDownImg
    } else if (bird.vel.y > 0){
        bird.img = flapUpImg 
    } else if (bird.vel.y == 0){
        bird.img = flapMidImg
    }

    bird.rotation = bird.vel.y * 10

    bird.x = 200

    fill("black");
    textSize(20);
    text("vel.y: " + bird.vel.y.toFixed(2), 10, 20);
    text("isMoving: " + bird.isMoving, 10, 40);
    text("isSleeping: " + bird.sleeping, 10, 60);

    if (frameCount == 1){
        spawnPipePair();
    }
}

function preload() {
    flapMidImg = loadImage("assets/yellowbird-midflap.png");
    flapDownImg = loadImage("assets/yellowbird-downflap.png"); //GOING UPWARDS
    flapUpImg = loadImage("assets/yellowbird-upflap.png"); //GOING DOWNWARDS 
    bg = loadImage("assets/background-day.png");
    base = loadImage("assets/base.png");
    pipe = loadImage("assets/pipe-green.png")
}

function spawnPipePair(){
    let gap = 50;
    let midY = height / 2;

    bottomPipe = new Sprite(400, midY + gap / 2 + 200, 52, 320, "static");
    bottomPipe.img = pipe;

    pipeGroup.add(bottomPipe);
    pipeGroup.layer = 0;
}