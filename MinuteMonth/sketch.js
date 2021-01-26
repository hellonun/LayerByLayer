let units = [];
let min, hour, day, week, month;
let u = 0; // max unit


let num; // box per row and column
let d; // divider
let index = 0; //index  
// let cols = ['red', 'Chartreuse', 'blue', 'cyan'];
let cols = [
  [244, 192, 53], // yellow
  [233, 76, 65], // red
  [21, 114, 72], // green 
  [103, 84, 68], // brown
  [208, 211, 212], // grey 
];

let unitLabels = ['Minute', 'Hour', 'Day', 'Week', 'Month'];
let ts; 

// let unitLabels = ['Seconds','Minute', 'Hour', 'Day', 'Week', 'Month'];
// let cols = ['0F4C81','C0D725','F26B5B','F1EEE6','373838'];

function preload() {
  myFont = loadFont('OpenSans-Regular.ttf');
}

function setup() {
  textFont(myFont); 
  // sec = 1; 
  // min = sec*60;
  min = 1;
  hour = min * 60;
  day = hour * 24;
  week = day * 7;
  month = week * 4;
  units.push(min, hour, day, week, month);

  // units.push(sec, min, hour, day, week, month);

  if (windowHeight < windowWidth) {
    cv = windowHeight;
  } else {
    cv = windowWidth;
  }
  createCanvas(cv, cv);
  ts = width/22;
  drawGrid();

}


function drawLabel() {
  for (let i = 0; i <= u; i++) {
    fill(0);
    textAlign(LEFT, CENTER);
    // ts = width / 20;
    textSize(ts);

    let xx = (ts + ts + textWidth('Minute')) / 4; // box + space + text

    let yy = height / 2 + i * ts * 1.6;
    let y1 = height / 2 + 0 * ts * 1.6;
    let y2 = height / 2 + u * ts * 1.6;
    let h = dist(0, y1, 0, y2); // height between top and bottom rects

    push();
    translate(width / 2 - xx, -h / 2);

    // text
    fill(0);
    noStroke();
    text(unitLabels[i], ts / 2, yy);
    fill(cols[i]);

    // rect
    rectMode(CENTER);
    stroke(0);
    strokeWeight(1);
    rect(-ts / 2, yy, ts);
    console.log(u);
    pop();


  }
  if (u == 1) {
    textAlign(CENTER, BOTTOM);
    ts1 = ts / 2;
    textSize(ts1);
    noStroke()
    text("(Click or tap to advance sketch.)", width / 2, height - ts);

  }

  // reset u
  if (u > 3) {
    u = 0;
  }
}

function drawGrid() {
  u++;
  index = 0;

  let num = round(sqrt(units[u]));
  // console.log(num);
  d = width / num;

  background(222, 226, 222);
  strokeWeight(0.5);
  stroke(255);
  for (y = 0; y < num; y++) {
    for (x = 0; x < num; x++) {
      for (i = 0; i < units.length; i++) {
        if (index >= units[i] && index < units[i + 1]) {
          let col = color(cols[i + 1]);
          // console.log(col);
          fill(col);
        }
        if (index == 0) {
          fill(cols[0]); // first unit
        }
        if (index >= units[u]) {
          fill('white');
        }
      }
      rectMode(CORNER);
      rect(x * d, y * d, d, d);
      index++;
    }
  }
  drawLabel();
}

function mousePressed() {
  drawGrid();

}