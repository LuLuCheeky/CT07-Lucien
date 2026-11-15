const LEVEL_END = 2200;
const START_X = 180;
const FLOOR_Y = 480;
const PILLAR_X = 1840;

let runner;
let ground;
let enemies;
let phase = "outbound";
let startedAt = 0;
let gameResult = "";
let facing = 1;
let runSpeed = 0;
let boostFrames = 0;
let grabReady = false;
let flightFrames = 0;
let landingBoostFrames = 0;
let longJumpActive = false;
let stunFrames = 0;
let hitCooldown = 0;
let enemyStun = 0;
let circleX = -1000;
let circleY = FLOOR_Y - 22;
let wasGrounded = true;

function setup() {
  new Canvas(960, 540);
  world.gravity.y = 1.4;

  ground = new Group();
  ground.collider = "static";
  ground.color = "#394653";
  ground.stroke = "#6b7785";
  new ground.Sprite(LEVEL_END / 2, FLOOR_Y + 18, LEVEL_END, 36);

  runner = new Sprite(START_X, FLOOR_Y - 25, 22, 46, "dynamic");
  runner.color = "transparent";
  runner.stroke = "transparent";
  runner.rotationLock = true;
  runner.friction = 0;
  runner.bounciness = 0;

  enemies = [
    { x: 660, y: FLOOR_Y - 24, direction: 1, left: 570, right: 820 },
    { x: 1190, y: FLOOR_Y - 24, direction: -1, left: 1050, right: 1350 },
    { x: 1580, y: FLOOR_Y - 24, direction: 1, left: 1480, right: 1710 }
  ];
}

function update() {
  if (gameResult) return;
  if (hitCooldown > 0) hitCooldown--;

  if (kb.presses("x")) {
    if (!wasGrounded && kb.pressing("up")) {
      flightFrames = 48;
      runner.vel.x = facing * 18;
      runner.vel.y = min(runner.vel.y, -2);
    } else {
      boostFrames = 32;
      grabReady = true;
      runner.vel.x = facing * 13;
    }
  }

  const left = kb.pressing("arrowLeft");
  const right = kb.pressing("arrowRight");
  const direction = (right ? 1 : 0) - (left ? 1 : 0);
  const running = kb.pressing("control");

  if (direction !== 0) facing = direction;
  if (stunFrames > 0) {
    stunFrames--;
    runner.vel.x *= 0.88;
  } else if (direction !== 0) {
    const cap = running ? 24 : 4;
    runSpeed = min(cap, runSpeed + (running ? 0.28 : 0.35));
    const targetSpeed = landingBoostFrames > 0
      ? max(runSpeed, 18)
      : boostFrames > 0 ? max(runSpeed, 14) : runSpeed;
    runner.vel.x = direction * targetSpeed;
  } else if (landingBoostFrames > 0 || boostFrames > 0) {
    runner.vel.x = facing * max(runSpeed, landingBoostFrames > 0 ? 18 : 14);
  } else {
    runSpeed = max(0, runSpeed - 0.5);
    runner.vel.x *= 0.82;
  }

  const onFloor = runner.y >= FLOOR_Y - 25 && runner.vel.y >= 0;
  if (kb.presses("z") && onFloor) {
    const longJump = grabReady;
    runner.vel.y = kb.pressing("up") ? -16 : longJump ? -11 : -10;
    if (longJump) {
      runner.vel.x = facing * max(abs(runner.vel.x), 15);
      runSpeed = max(runSpeed, 15);
      longJumpActive = true;
      grabReady = false;
    }
  }

  if (kb.pressing("up") && !onFloor && runner.vel.y > -13) {
    runner.vel.y -= 0.45;
  }

  if (boostFrames > 0) boostFrames--;
  if (landingBoostFrames > 0) landingBoostFrames--;
  if (flightFrames > 0) {
    runner.vel.x = facing * 18;
    runner.vel.y = min(runner.vel.y, -1.5);
    flightFrames--;
  }

  runner.x = constrain(runner.x, 20, LEVEL_END - 20);
  if (onFloor && wasGrounded === false && longJumpActive) {
    runSpeed = max(runSpeed, 18);
    landingBoostFrames = 40;
    longJumpActive = false;
  }
  wasGrounded = onFloor;

  updateEnemies();
  checkPillar();

  if (phase === "returning" && millis() - startedAt > 120000) {
    phase = "chased";
    circleX = runner.x - facing * 360;
  }

  if (phase === "chased") {
    circleX += Math.sign(runner.x - circleX) * 3.8;
    circleY = FLOOR_Y - 22;
    if (abs(circleX - runner.x) < 38) gameResult = "caught";
  }

  if (phase !== "outbound" && runner.x <= START_X + 18) {
    gameResult = phase === "returning" ? "win" : "caught";
  }
}

function updateEnemies() {
  for (const enemy of enemies) {
    if (enemyStun > 0) continue;

    enemy.x += enemy.direction * 1.4;
    if (enemy.x >= enemy.right || enemy.x <= enemy.left) {
      enemy.direction *= -1;
    }

    if (hitCooldown === 0 && abs(runner.x - enemy.x) < 34 && abs(runner.y - enemy.y) < 48) {
      stunFrames = 48;
      hitCooldown = 75;
      runSpeed = 0;
      boostFrames = 0;
      runner.vel.x = -facing * 3;
    }
  }

  if (enemyStun > 0) enemyStun--;
}

function checkPillar() {
  if (phase === "outbound" && abs(runner.x - PILLAR_X) < 48) {
    phase = "returning";
    startedAt = millis();
    enemyStun = 180;
    runSpeed = max(runSpeed, 12);
  }
}

function drawFrame() {
  background("#242b3a");
  camera.x = constrain(runner.x, width / 2, LEVEL_END - width / 2);
  camera.y = height / 2;
  camera.on();

  noStroke();
  fill("#30394a");
  for (let x = 70; x < LEVEL_END; x += 180) {
    rect(x, 105 + (x % 3) * 16, 86, 260);
    fill("#414b5e");
    rect(x + 18, 135 + (x % 3) * 16, 12, 12);
    fill("#30394a");
  }

  allSprites.draw();
  drawRouteMarkers();
  drawPillar();
  for (const enemy of enemies) {
    if (enemyStun === 0 || frameCount % 8 < 4) {
      drawStickFigure(enemy.x, enemy.y, enemy.direction, "#ff6b6b");
    }
  }
  drawStickFigure(runner.x, runner.y, facing, stunFrames > 0 ? "#aeb4c2" : "#ffe082");

  if (phase === "chased") {
    fill("#ec4899");
    stroke("#ffd1e7");
    strokeWeight(3);
    circle(circleX, circleY, 46);
  }

  camera.off();
  drawHud();
}

function drawRouteMarkers() {
  stroke("#ffd166");
  strokeWeight(4);
  line(START_X, FLOOR_Y - 4, START_X, FLOOR_Y - 78);
  noStroke();
  fill("#ffd166");
  textSize(14);
  textAlign(CENTER);
  text("START / FINISH", START_X, FLOOR_Y - 88);
  fill("#8be9fd");
  text("PILLAR → TURN AROUND", PILLAR_X, FLOOR_Y - 90);
}

function drawPillar() {
  if (phase === "outbound") {
    push();
    translate(PILLAR_X, FLOOR_Y - 35);
    rotate(-0.15);
    rectMode(CENTER);
    stroke("#e0a458");
    strokeWeight(4);
    fill("#b66a3c");
    rect(0, 0, 34, 70, 5);
    pop();
  } else {
    stroke("#b66a3c");
    strokeWeight(18);
    line(PILLAR_X - 35, FLOOR_Y - 10, PILLAR_X + 38, FLOOR_Y - 25);
    noStroke();
    fill("#ffe082");
    textAlign(CENTER);
    textSize(16);
    text("PILLAR DOWN! TURN BACK!", PILLAR_X, FLOOR_Y - 65);
  }
}

function drawStickFigure(x, y, direction, tint) {
  push();
  translate(x, y);
  stroke(tint);
  strokeWeight(4);
  strokeCap(ROUND);
  noFill();
  circle(0, -17, 13);
  line(0, -10, 0, 8);
  line(0, -5, direction * 11, 2);
  line(0, -5, -direction * 9, 0);
  line(0, 8, direction * 9, 20);
  line(0, 8, -direction * 8, 20);
  pop();
}

function drawHud() {
  noStroke();
  fill(17, 20, 30, 230);
  rect(0, 0, width, 66);

  const speed = abs(runner.vel.x);
  let mach = speed < 6 ? 1 : speed < 14 ? 2 : speed < 20 ? 3 : 4;
  fill("#f7f1e7");
  textAlign(LEFT, CENTER);
  textSize(18);
  text(`MACH ${mach}   ${Math.round(speed)} speed`, 18, 24);

  textAlign(CENTER, CENTER);
  if (phase === "outbound") {
    fill("#8be9fd");
    text("Run to the pillar!", width / 2, 24);
  } else {
    const elapsed = millis() - startedAt;
    const secondsLeft = max(0, ceil((120000 - elapsed) / 1000));
    fill(phase === "chased" ? "#ff8aa8" : "#ffd166");
    text(phase === "chased" ? "TIME'S UP! OUTRUN THE CHASER!" : `RETURN!  ${secondsLeft}s`, width / 2, 24);
  }

  fill("#d7d9e0");
  textAlign(RIGHT, CENTER);
  text(stunFrames > 0 ? "STUNNED!" : "← → move  ·  Ctrl run  ·  Z jump  ·  X grab", width - 18, 24);

  if (gameResult) {
    fill(12, 14, 22, 220);
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(gameResult === "win" ? "#9be7a5" : "#ff8aa8");
    text(gameResult === "win" ? "YOU MADE IT!" : "CAUGHT!", width / 2, height / 2 - 28);
    textSize(21);
    fill("#f7f1e7");
    text(gameResult === "win" ? "The round trip is complete." : "The chaser caught you. Refresh to try again.", width / 2, height / 2 + 22);
  }
}
