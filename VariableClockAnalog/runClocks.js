
function runClocks() {
  d = new Date();
  hours = d.getHours();
  mins = d.getMinutes();
  secs = d.getSeconds();
  millisecs = d.getMilliseconds();

  count = (secs * 1000) + millisecs;

  angleMode(RADIANS);

  // normal counts
  norcount = count / 1000;

  // sine counts
  i = map(count, 0, 60000, 0, 360);
  sineVal = sin(radians(i));
  sineVal = map(sineVal, 1, -1, -5, 5); // set interval
  sinecount = (count / 1000 + sineVal);

  // square counts
  if (count > 30000) {
    sqVal = ((count - 30000) * 2)
  } else {
    sqVal = 0;
  }
  squcount = (sqVal / 1000);

  // tri counts
  m = map(count, 0, 60000, 0, 90);
  triVal = sin(radians(m));
  tricount = (map(triVal, 0, 1, 0, 60)); // set interval

  
  
  // console.log(norcount, sinecount, squcount,tricount);
}