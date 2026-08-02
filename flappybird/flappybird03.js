let bird, floor; // objects
let flapMidImg,  bg, base; // images
let flapUpImg,flapDownImg; // images for flap up and down
let pipe; // image for pipes
let topPipe, bottomPipe;
let pipeGroup; // declare the group for pipe
let gameOverImg;
let gameOverLabel;
let startScreenLabel;
let startScreenImg;
let startGame = false;

function preload() {
    // bird image, background and the floor
    flapMidImg = loadImage('assets/yellowbird-midflap.png'); 
    // preload images for flap up and down
    flapUpImg = loadImage('assets/yellowbird-upflap.png');
    flapDownImg = loadImage('assets/yellowbird-downflap.png')

    pipe = loadImage('assets/pipe-green.png'); // preload image for pipe

    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');

    gameOverImg = loadImage("assets/gameover.png");

    startScreenImg = loadImage("assets/message.png");
}

function setup() {
    new Canvas(400, 600);

  // Bird Sprite construction
    bird = new Sprite();
    bird.x = width / 2;
    bird.y = 200,
    bird.width = 15;
    bird.height = 20;
    bird.img = flapMidImg; // defined earlier in preload()
    bird.visible = false

  // setting bird physics
    bird.collider = "static"; 
    bird.mass = 2;         // heavier = stronger pull from gravity
    bird.drag = 0.02;      // air resistance
    bird.bounciness = 0.5; // how much it bounces when hitting floor
    world.gravity.y = 10;

  // Floor to bounce bird
    floor = new Sprite();
    floor.x = 200;
    floor.y = height - 20;
    floor.width = 400;
    floor.height = 125;
    floor.collider = "static"; 
    floor.img = base;

    pipeGroup = new Group();

    startScreenLabel = new Sprite(width / 2, height / 2, 50, 50, "none");
    startScreenLabel.img = startScreenImg; 
}

function draw() {
    image(bg, 0, 0, width, height);

    if (kb.presses('space') || mouse.presses()) {
        startGame = true;
        startScreenLabel.visible = false;
    }

    if (startGame){
        bird.collider = "dynamic"; 
        bird.visible = true
          // Apply upward push when space is pressed
        if (kb.presses('space') || mouse.presses()) {
            bird.vel.y = -2; // which direction do you think this is?
            bird.sleeping = false; // wake up if sleeping
        }
  
  // Activity: Change image according to flying action/ falling
        if (bird.vel.y < -1) {
            bird.img = flapUpImg; // flying upward
        } 
        else if (bird.vel.y > 1) {
            bird.img = flapDownImg; // falling
        } 
        else {
            bird.img = flapMidImg; // neutral
        }
        bird.rotation = bird.vel.y * 10

        bird.x += 2;
        camera.x = bird.x; 
        floor.x = bird.x;

        if (frameCount === 1){
            spawnPipePair();
        }

        if (frameCount % 90 === 0){
            spawnPipePair();
        }

        for (let pipe of pipeGroup){
            if (pipe.x < -50){
                pipe.remove();
            }
        }

  // Debug info (optional)
        fill("black");
        textSize(20);
        text('vel.y: ' + bird.vel.y.toFixed(2), 10, 20);
        text('isMoving: ' + bird.isMoving, 10, 40);
        text('sleeping: ' + bird.sleeping , 10, 60);

        if (bird.collides(pipeGroup) || bird.collides(floor)){
            gameOverLabel = new Sprite(width / 2, height / 2, 192, 42);
            gameOverLabel.img = gameOverImg;
            gameOverLabel.layer = 100;
            gameOverLabel.x = camera.x;

            noLoop();
        }
    }


}
 

function spawnPipePair(){
  // fill in this code later
   // control the gap and height of the top and bottom pipe
    let gap = 50;
    let midY = random(250, height - 250);

  // create the top pipe
    topPipe = new Sprite(bird.x + 400, midY - gap / 2 - 160, 52, 320, 'static');
    topPipe.img = pipe;
    topPipe.rotation = 180;

  // create the bottom pipe sprite
    bottomPipe = new Sprite(bird.x + 400, midY + gap / 2 + 160, 52, 320, 'static');
    bottomPipe.img = pipe;

    pipeGroup.add(topPipe);
    pipeGroup.add(bottomPipe);
    pipeGroup.layer = 0;
}