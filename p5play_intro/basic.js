function setup() {
  new Canvas(800, 400);
  console.log("setup");
  background(220);
  let height = 5;
  let width = 10;
  let area = height * width / 2;
  let total = 0;
  let age = 0;
  let count = 19;
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
  for (let i = 2; i < 22; i += 2) {
    console.log(i);
    total += i;
  }
  console.log(total);
  text(total, 100, 200);
  for (let i = 0; i < 13; i++) {
    age += 1;
    if (age <= 9) {
      console.log("lower primary");
    } else if (age <= 12) {
      console.log("upper primary");
    } else {
      console.log("secondary");
    }
 
  }


  while (count > 0) {
    count -= 2;
    console.log(i);
  } 
}

