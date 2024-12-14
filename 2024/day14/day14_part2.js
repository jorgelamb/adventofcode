var fs = require('fs');

function log(o) {
  console.log(o);
}

const TEST = false;


const FILENAME = process.argv[2];
fs.readFile(FILENAME, 'utf8', function(err, data) {
  if (err) throw err;
  var input = data.trim();

var lines = input.split("\n");

var ROWS = TEST ? 7 : 103;
var COLUMNS = TEST ? 11 : 101;
var MIDROW = (ROWS-1) / 2;
var MIDCOLUMN = (COLUMNS-1) / 2;
var ROUNDS = ROWS * COLUMNS;

var robots = [];
lines.forEach(l => {
  robots.push([...l.matchAll("[-0-9]+")].map(e => e[0]-0));
});

for(var i=0; i<ROUNDS; i++) {
  var matrix = [];
  for(var r=0; r<ROWS; r++) {
    matrix[r] = [];
    for(var c=0; c<COLUMNS; c++) {
      matrix[r].push(" ");
    }
  }
  robots.map(robot => {
    var finalRow = (robot[1] + i * robot[3]) % ROWS;
    if(finalRow < 0) { finalRow += ROWS; }
  
    var finalColumn = (robot[0] + i * robot[2]) % COLUMNS;
    if(finalColumn < 0) { finalColumn += COLUMNS; }

    matrix[finalRow][finalColumn] = "X";
    return {column: finalColumn, row: finalRow};
  });

  log(matrix.map(e => e.join("")).join("\r\n"));
  log(`---------------------------- ${i} ---------------------------------`);
}


});
