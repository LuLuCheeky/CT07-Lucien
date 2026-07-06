let ball;
let box;

function setup() {
  // Set up the canvas
  new Canvas(800, 400);
  background(250); //background color

  ball = new Sprite();
  ball.x = 100;
  ball.y = 200;
  ball.diameter = 40;
  ball.color = "yellow"
  ball.vel.x = 30;
  ball.vel.y = 30;
  ball.collider = "dynamic";
  ball.bounciness = 1.0;
  
  
  box = new Sprite();
  box.x = 100;
  box.y = 100;
  box.w = 50;
  box.h = 50;
  box.color = "yellow";

  box2 = new Sprite();
  box2.x = 400;
  box2.y = 200;
  box2.w = 50;
  box2.h = 50;
  box2.color = "yellow";
}

function draw() {
  background(240);
  fill(0);
  textSize(16);
  text("Ball: (" + int(ball.x) + ", " + int(ball.y) + ")", 10, 20);
  text("Mouse: (" + int(mouse.x) + ", " + int(mouse.y) + ")", 10, 40);
  if (ball.x < 0 + ball.diameter / 2 || ball.x > width - ball.diameter / 2) {
    ball.vel.x *= -1;
  }
  if (ball.y < 0 + ball.diameter / 2 || ball.y > height - ball.diameter / 2) {
    ball.vel.y *= -1;
  }
    if (box2.x < 0 + box2.diameter / 2 || box2.x > width - box2.diameter / 2) {
    ball.vel.x *= -1;
  }
  if (box2.y < 0 + box2.diameter / 2 || box2.y > height - box2.diameter / 2) {
    ball.vel.y *= -1;
  }

  box.x = mouse.x;
  box.y = mouse.y;
}