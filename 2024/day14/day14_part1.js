var lines = input.split("\n");

var TEST = false;
var ROWS = TEST ? 7 : 103;
var COLUMNS = TEST ? 11 : 101;
var MIDROW = (ROWS-1) / 2;
var MIDCOLUMN = (COLUMNS-1) / 2;
var ROUNDS = 100;

var robots = [];
lines.forEach(l => {
  robots.push([...l.matchAll("[-0-9]+")].map(e => e[0]-0));
});

var quadrants = [[0, 0], [0, 0]];
robots.forEach(robot => {
  var finalRow = (robot[1] + ROUNDS * robot[3]) % ROWS;
  if(finalRow < 0) { finalRow += ROWS; }
  
  var finalColumn = (robot[0] + ROUNDS * robot[2]) % COLUMNS;
  if(finalColumn < 0) { finalColumn += COLUMNS; }

  if(finalRow == MIDROW || finalColumn == MIDCOLUMN) {
    return;
  } else {
    quadrants[finalRow < MIDROW ?  0 : 1][finalColumn < MIDCOLUMN ?  0 : 1] ++;
  }
});
log(quadrants);
var result = quadrants[0][0]*quadrants[0][1]*quadrants[1][0]*quadrants[1][1];
log(`result: ${result}`);
