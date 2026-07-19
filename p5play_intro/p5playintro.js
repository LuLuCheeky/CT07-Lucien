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
  ball.vel.x = 5;
  ball.vel.y = 5;
  ball.collider = "dynamic";
  ball.bounciness = 5.0;
  
  
  box = new Sprite();
  box.x = 100;
  box.y = 100;
  box.w = 50;
  box.h = 50;
  box.color = color(random(255), random(255), random(255));
  box.rotation = 100;

  for (let i = 0; i < 6; i++) {
    let b = new Sprite();
    b.x = random(50, width - 50);
    b.y = random(50, height - 50);
    b.w = 40;
    b.h = 40;
    b.color = color(random(255), random(255), random(255));
    boxes.push(b);
  }

  box2 = new Sprite();
  box2.x = 400;
  box2.y = 200;
  box2.w = 50;
  box2.h = 50;
  box2.color = color(random(255), random(255), random(255));
  box2.vel.x = 4;
  box2.vel.y = 3;
  box2.collider = "dynamic";
}

function draw() {
  noStroke();
  fill(240, 80);
  rect(0, 0, width, height);

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

  if (box2.x < box2.w / 2) {
    box2.vel.x *= -1;
    box2.x = box2.w / 2;
  }
  if (box2.x > width - box2.w / 2) {
    box2.vel.x *= -1;
    box2.x = width - box2.w / 2;
  }
  if (box2.y < box2.h / 2) {
    box2.vel.y *= -1;
    box2.y = box2.h / 2;
  }
  if (box2.y > height - box2.h / 2) {
    box2.vel.y *= -1;
    box2.y = height - box2.h / 2;
  }

  box.x = mouse.x;
  box.y = mouse.y;
  box.rotation += 3;
}