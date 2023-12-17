var fs = require('fs');

function log(o) {
  console.log(JSON.stringify(o));
}

const TEST = false;

const FILENAME = process.argv[2];
fs.readFile(FILENAME, 'utf8', function(err, data) {
  if (err) throw err;
  var input = data.trim();



function isValid(row, column) {
  return row>=0 && row<map.length && column>=0 && column<map[0].length;
}

function addIfValid(row, column, direction, length, heatTotal) {
  if(isValid(row, column)) {
    var newHeatTotal = heatTotal + map[row][column];
    if(length<=3) {
      var existing = pending.map(p => p.filter(e => e[0]==row && e[1]==column && e[2]==direction && e[3]==length)).reduce((a, b) => [...a, ...b], []);
      var existingProcessed = processed.filter(e => e[0]==row && e[1]==column && e[2]==direction && e[3]==length);
      if(existing.length>0 || existingProcessed.length>0) {
        // Do nothing
      } else {
        if(row==map.length-1 && column==map[0].length-1) {
          log(`Found at ${newHeatTotal}`);
          throw `Found at ${newHeatTotal}`;
        }
        pending[newHeatTotal].push([row, column, direction, length, newHeatTotal]);
      }
    }
  }
}

var map = input.split("\n").map(l => l.split("").map(e => parseInt(e)));

var pending = Array();
for(var i=0; i<1000; i++) {
  pending[i] = [];
}

var processed = [];

addIfValid(0, 1, "E", 1, 0);
addIfValid(1, 0, "S", 1, 0);

var lastTotal = 0;
while(true) {
  var current = pending.find(e => e.length>0).shift();
  if(lastTotal<current[4]) {
    lastTotal=current[4];
    console.log(lastTotal);
  }
  processed.push(current);

  switch(current[2]) {
    case "E":
      addIfValid(current[0], current[1]+1, "E", current[3]+1, current[4]);
      addIfValid(current[0]+1, current[1], "S", 1, current[4]);
      addIfValid(current[0]-1, current[1], "N", 1, current[4]);
      break;
    case "W":
      addIfValid(current[0], current[1]-1, "W", current[3]+1, current[4]);
      addIfValid(current[0]+1, current[1], "S", 1, current[4], current[5]);
      addIfValid(current[0]-1, current[1], "N", 1, current[4], current[5]);
      break;
    case "N":
      addIfValid(current[0]-1, current[1], "N", current[3]+1, current[4]);
      addIfValid(current[0], current[1]-1, "W", 1, current[4]);
      addIfValid(current[0], current[1]+1, "E", 1, current[4]);
      break;
    case "S":
      addIfValid(current[0]+1, current[1], "S", current[3]+1, current[4]);
      addIfValid(current[0], current[1]-1, "W", 1, current[4]);
      addIfValid(current[0], current[1]+1, "E", 1, current[4]);
      break;
  }
  
}

}); // read file
