let vid;
let playing = true;
let completion;

let w, h;
// player
let playingTime;
let tsd , tst;
let count =  600; // don't display at start
let countKey =  0;
let playerX;

let state = 0;

function preload() {
    vid = createVideo('https://player.vimeo.com/external/472000608.hd.mp4?s=ca7ab7013bbdf7d92cc5b013e1d4464833aec67b&profile_id=174');
  // vid = createVideo('lightcalendar2.mp4');
  myFont = loadFont('OpenSans-Regular.ttf');

}


function setup() {
  textFont(myFont);

  // 864, 540
  // let w = 864;
  // let h = 540;
  if (windowWidth/ windowHeight < 1.6) {
    w = windowWidth;
    h = windowWidth/1.6;
  } else {
    h = windowHeight;
    w = windowHeight / 0.625;
    // h = 540;
  }

  barHeight = h / 27;
  tsd = h / 54; // textSizeDate
  tst = h / 25; // textSizeTime

  createCanvas(w, h);
  vid.play();
  vid.loop();
  vid.hide();
  vid.time(77); // set starting time

}

function draw() {

  background(50);
  completion = vid.time() / vid.duration();
  image(vid,0,0, w , h);

  // calendar
  let cols = 6;
  let rows = 5;
  let d = 14// date
  for (y = 0; y<rows; y ++) {
    for (x = 0; x<cols; x ++) {
      push();
      noFill();
      // stroke(255,30);
      rectMode(CORNER);
      translate(width/cols*x,height/rows*y);
      rect (0,0,width/cols, height/rows);
      textAlign(RIGHT,TOP);
      textSize(tsd);

      fill(255,180);

      // ---- DATE
      strokeWeight(0.5);
      if (d >=14) {
        text ("Sep " + d, width/cols - tsd/4, tsd/4);
      } else {
        text ("Oct " +d, width/cols - tsd/4, tsd/4);
      }
      // if (d == 14) {
      //   text ("Sep " + d, width/cols - tsd/4, tsd/4);
      // } else if (d == 1) {
      //   text ("Oct " +d, width/cols - tsd/4, tsd/4);
      // } else {
      //   text (d, width/cols - tsd/4, tsd/4);
      // }

      if (d>=30) {
        d = 1;
      } else {
        d++;
      }

      // ---- TIME
      let tTime = vid.duration(); // total time
      let cTime = vid.time();  // current time

      let hour = (cTime / tTime * 24)
      let min = hour % 1;
      min = nf(floor(map(min,0,1,0,60)),2,0);
      if (hour >12) {

        hour = hour-12;
        if (hour>1){
          hour = (nf(hour, 2,0));
          hour = hour[0] + hour [1] + ":";
          playingTime = hour + min + " PM";
        } else {

          playingTime = 12 + ":"+ min + " PM";
        }

      } else {
        hour = (nf(hour, 2,0));
        hour = hour[0] + hour [1] + ":";
        playingTime = hour + min +" AM";
      }

      // textSize(tst);
      // textAlign(RIGHT, BOTTOM);
      // text (playingTime, width/cols - tst/2, height/rows- tst/3);
      pop();
    }
  }

  // count keyboard
  countKey++;

  if (countKey < 120) { // 1 sec
    displayPlayer();
    // displayMouse();
  }


  // count mouse
  if (mouseX !=pmouseX) {
    count = 0;
  }
  count++;

  if (count < 120) { // 1 sec
    displayPlayer();
    displayMouse();
  }

 if (state <2) {
   background(0,200);
   textSize(tst/1.5);
   fill(255);
   text("(Hit space bar twice to start the installation.)", width/2, height/2);
 }
}

function displayPlayer() {
  // player
  textSize(tst);
  noStroke();
  fill(0,200);
  rectMode(CENTER);
  rect(width/2, height-barHeight/2, width, barHeight);

  playerX = completion*width;

  rectMode(CORNER);
  fill (255,180);
  rect(0,height - barHeight, playerX, barHeight);

  // current time
  playingTimeLength = textWidth(playingTime);
  rectMode(CENTER);
  fill(255);
  rect (playerX, height - barHeight, playingTimeLength * 1.2, tst *1.2);
  fill(0);
  textAlign(CENTER, CENTER);
  text(playingTime,playerX, height - barHeight - tst*0.15);
}


function displayMouse() {
  if (mouseY >height - barHeight && mouseY<height) {
    let mouseTime = map(mouseX, 0, width, 0,24);
    let min = mouseTime % 1;
    min = nf(floor(map(min,0,1,0,60)),2,0);

    if (mouseTime >12) {


      mouseTime = mouseTime-12;

      if (mouseTime> 1) {
        mouseTime = (nf(mouseTime, 2,0));
        mouseTime = mouseTime[0] + mouseTime [1] + ":";
        mouseTime = mouseTime + min + " PM";
      } else {

        mouseTime = 12  + ":"+ min + " PM";
      }

    } else {
      mouseTime = (nf(mouseTime, 2,0));
      mouseTime = mouseTime[0] + mouseTime [1] + ":";
      mouseTime = mouseTime + min +" AM";
    }

    rectMode(CENTER);
    fill(0,230);
    rect (mouseX, height - barHeight, playingTimeLength * 1.2, tst *1.2);
    fill(255);
    text(mouseTime,mouseX, height - barHeight- tst*0.15);
  }
}





function mousePressed() {
  // only on bar
  if (mouseY >height - barHeight && mouseY<height) {
    vid.time((mouseX/width) * vid.duration());
  }
}

function mouseDragged() {
  // if (mouseY >height - barHeight && mouseY<height) {
  vid.time((mouseX/width) * vid.duration());
  // }
}

function keyPressed() {
  if (key === ' '){
    state++;
    countKey = 0;
    if (!playing) {
      vid.play();
      vid.time(vid.time());

      // vid.time((mouseX/width) * vid.duration());
      playing = true;

    }
    else {
      vid.pause();
      vid.time(vid.time());

      // vid.time((mouseX/width) * vid.duration());
      playing = false;

    }
  }

}
