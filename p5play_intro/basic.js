function setup() {
  new Canvas(800, 400);
  console.log("setup");
  background(220);
  let height = 5;
  let width = 10;
  let area = height * width / 2;
  let total = 0;
  console.log(area);
  text(area, 100, 100)
  for (let i = 10; i <= 20; i++) {
    console.log(i);
  }
  for (let i = 20; i > 9; i--) {
    console.log(i);
  }
  for (let i = 3; i < 46; i+=3) {
    console.log(i);
  }
  for (let i = 2; i < 20; i += 2) {
    total += i;
  }
  console.log(total);
  text(total, 100, 200);
}

