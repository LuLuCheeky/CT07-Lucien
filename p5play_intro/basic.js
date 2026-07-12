function setup() {
  new Canvas(800, 400);
  console.log("setup");
  background(220);
  let height = 5;
  let width = 10;
  let area = height * width / 2;
  console.log(area);
  text(area, 100, 100)
  for (let i = 9; i <= 20; i++) {
    console.log(i);
  }
  for (let i = 19; i > 1; i--) {
    console.log(i);
  }
  for (let i = 3; i < 46; i+=3) {
    console.log(i);
  }
}

