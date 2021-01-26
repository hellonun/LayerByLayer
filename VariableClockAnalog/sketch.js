// We each live in 'distorted' time. It is only when we check our watches that we snap back into our 'synchronized' time.

// The second hands in this clock move in distorted time and snap back together every minute.

let hours, mins, secs;
let norcount, sinecount, squcount, tricount;
let count;

// clockface
let x, y, r, centerX, centerY;

function preload() {
  myFont = loadFont('OpenSans-Regular.ttf');
  // myFont = loadFont('SpaceMono-Regular.ttf');
}

function setup() {
    textFont(myFont);
  if (windowHeight < windowWidth) {
      cv = windowHeight; 
  } else {
     cv = windowWidth; 
  }
  
  createCanvas(cv, cv);
  centerX = width / 2;
  centerY = height / 2;
  r = width / 4; // radius of hour clock
}

function draw() {
  background(222,226,222);
  fill(0);
  runClocks();

  // ------------- CLOCK CIRCLES
  strokeWeight(width / 800);
  stroke(0, 64);
  noFill();

  // set hands
  let clock = r * 3;
  let secClock = r * 2.8;
  let minClock = r * 2.6;
  let hourClock = r * 1.8;
  noStroke();
  fill(208,211,212);
  ellipse(centerX, centerY, clock, clock); // seconds circle

  // ellipse(centerX, centerY, secClock, secClock); // seconds circle
  // ellipse(centerX, centerY, minClock, minClock); // minute circle
  // ellipse(centerX, centerY, hourClock, hourClock); // hour circle



  // ------------- SECONDS
  let norClock = (map(norcount, 0, 60, -90, 270));
  let sineClock = (map(sinecount, 0, 60, -90, 270));
  let squClock = (map(squcount, 0, 60, -90, 270));
  let triClock = (map(tricount, 0, 60, -90, 270));

  angleMode(DEGREES);
  //Move
  let x1 = (cos(norClock) * (secClock) / 2) + centerX;
  let y1 = (sin(norClock) * (secClock) / 2) + centerY;
  let x2 = (cos(sineClock) * (secClock) / 2) + centerX;
  let y2 = (sin(sineClock) * (secClock) / 2) + centerY;
  let x3 = (cos(squClock) * (secClock) / 2) + centerX;
  let y3 = (sin(squClock) * (secClock) / 2) + centerY;
  let x4 = (cos(triClock) * (secClock) / 2) + centerX;
  let y4 = (sin(triClock) * (secClock) / 2) + centerY;

  // tails 
  let norTail = map(norClock, -90, 270, 90, 450);
  let sineTail = map(sineClock, -90, 270, 90, 450);
  let squTail = map(squClock, -90, 270, 90, 450);
  let triTail = map(triClock, -90, 270, 90, 450);
  let xt1 = (cos(norTail) * (secClock / 8) / 2) + centerX;
  let yt1 = (sin(norTail) * (secClock / 8) / 2) + centerY;
  let xt2 = (cos(sineTail) * (secClock / 8) / 2) + centerX;
  let yt2 = (sin(sineTail) * (secClock / 8) / 2) + centerY;
  let xt3 = (cos(squTail) * (secClock / 8) / 2) + centerX;
  let yt3 = (sin(squTail) * (secClock / 8) / 2) + centerY;
  let xt4 = (cos(triTail) * (secClock / 8) / 2) + centerX;
  let yt4 = (sin(triTail) * (secClock / 8) / 2) + centerY;


  // ------------- MINUTES AND HOURS
  mins = mins + norcount / 60;
  if (hours > 12) {
    hours = hours - 12;
  }
  hours = hours + mins / 60;

  let hoursClock = (map(hours, 0, 12, -90, 270));
  let minsClock = (map(mins, 0, 60, -90, 270));

  let x5 = (cos(hoursClock) * hourClock / 2) + centerX;
  let y5 = (sin(hoursClock) * hourClock / 2) + centerY;

  let x6 = (cos(minsClock) * minClock / 2) + centerX;
  let y6 = (sin(minsClock) * minClock / 2) + centerY;

  mins = mins.toFixed(3);
  hours = hours.toFixed(3);


  stroke(50);
  strokeWeight(r / 37);
  line(centerX, centerY, x6, y6);
    strokeWeight(r / 17);

  line(centerX, centerY, x5, y5);

  //   text(mins, x6, y6);
  //   text(hours, x5, y5);

  // DRAW SECONDS
  let secondSize = width / 50
  strokeWeight(2);
  stroke(233,76,65);
  line(xt1, yt1, x1, y1);
  line(xt2, yt2, x2, y2);
  line(xt3, yt3, x3, y3);
  line(xt4, yt4, x4, y4);

  noStroke();
  fill(233,76,65)
  ellipse(centerX, centerY, width / 50, height / 50);

  ts = r / 11;
  textSize(ts);
  textAlign(RIGHT, BOTTOM);

  push();
  translate(x1, y1)
  test = map(norcount, 0, 60, -90, 270);
  rotate(test);
  text(nf(norcount, 2, 2), 0, -ts/3);
  pop();

  push();
  translate(x2, y2)
  test = map(sinecount, 0, 60, -90, 270);
  rotate(test);
  text(nf(sinecount, 2, 2), 0, -ts/3);
  pop();
  push();
  translate(x3, y3)
  test = map(squcount, 0, 60, -90, 270);
  rotate(test);
  text(nf(squcount, 2, 2), 0, -ts/3);
  pop();
  push();
  translate(x4, y4)
  test = map(tricount, 0, 60, -90, 270);
  rotate(test);
  text(nf(tricount, 2, 2), 0, -ts/3);
  pop();
}