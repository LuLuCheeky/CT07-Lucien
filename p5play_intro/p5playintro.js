let ball;
let box;
let boxes = [];

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
  
  
  ball2 = new Sprite();
  ball2.x = 400;
  ball2.y = 200;
  ball2.diameter = 40;
  ball2.color = "blue";
  ball2.vel.x = 4;
  ball2.vel.y = 3;
  ball2.collider = "dynamic";
  ball2.bounciness = 1.0;
}

function draw() {
  background(240);
  fill(0);
  textSize(16);
  text("Ball: (" + int(ball.x) + ", " + int(ball.y) + ")", 10, 20);
  text("Mouse: (" + int(mouse.x) + ", " + int(mouse.y) + ")", 10, 40);
  if (ball.x < ball.diameter / 2) {
    ball.vel.x *= -1;
    ball.x = ball.diameter / 2;
  }
  if (ball.x > width - ball.diameter / 2) {
    ball.vel.x *= -1;
    ball.x = width - ball.diameter / 2;
  }
  if (ball.y < ball.diameter / 2) {
    ball.vel.y *= -1;
    ball.y = ball.diameter / 2;
  }
  if (ball.y > height - ball.diameter / 2) {
    ball.vel.y *= -1;
    ball.y = height - ball.diameter / 2;
  }

  if (ball2.x < ball2.diameter / 2) {
    ball2.vel.x *= -1;
    ball2.x = ball2.diameter / 2;
  }
  if (ball2.x > width - ball2.diameter / 2) {
    ball2.vel.x *= -1;
    ball2.x = width - ball2.diameter / 2;
  }
  if (ball2.y < ball2.diameter / 2) {
    ball2.vel.y *= -1;
    ball2.y = ball2.diameter / 2;
  }
  if (ball2.y > height - ball2.diameter / 2) {
    ball2.vel.y *= -1;
    ball2.y = height - ball2.diameter / 2;
  }

  ball2.x = mouse.x;
  ball2.y = mouse.y;
}