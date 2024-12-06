var fs = require('fs');

function log(o) {
  console.log(JSON.stringify(o));
}

const TEST = false;

const FILENAME = process.argv[2];
fs.readFile(FILENAME, 'utf8', function(err, data) {
  if (err) throw err;
  var input = data.trim();


var DIRECTIONS = [ [-1, 0], [0, 1], [1, 0], [0, -1] ];

var result = 0;

var tempMatrix = input.split("\n").map(l => l.split(""));

for(var ii=0; ii<tempMatrix.length; ii++) {
  for(var jj=0; jj<tempMatrix[0].length; jj++) {

    log(`ii=${ii}, jj=${jj}`);
    var matrix = input.split("\n").map(l => l.split(""));
    if(matrix[ii][jj] != ".") {
      continue;
    }
    matrix[ii][jj] = "#";

    var guard = [-1, -1, 0];
    for(var i=0; i<matrix.length; i++) {
      for(var j=0; j<matrix[0].length; j++) {
        if(matrix[i][j] == "^") {
          guard[0] = i;
          guard[1] = j;
        }
      }
    }

    var position = guard.join();
    var visited = {};
    while(guard[0]>=0 && guard[0]<matrix.length && guard[1]>=0 && guard[1]<matrix[0].length && !visited[position]) {
      visited[position] = true;
      if(matrix[guard[0]][guard[1]] == "." || matrix[guard[0]][guard[1]] == "^") {
        matrix[guard[0]][guard[1]] = "X";
      }
      if(guard[0]+DIRECTIONS[guard[2]][0]>=0 && guard[0]+DIRECTIONS[guard[2]][0]<matrix.length && guard[1]+DIRECTIONS[guard[2]][1]>=0 && guard[1]+DIRECTIONS[guard[2]][1]<matrix[0].length && matrix[ guard[0]+DIRECTIONS[guard[2]][0] ][ guard[1]+DIRECTIONS[guard[2]][1] ] == "#") {
        guard[2] = (guard[2]+1)%DIRECTIONS.length;
      } else {
        guard[0] += DIRECTIONS[guard[2]][0];
        guard[1] += DIRECTIONS[guard[2]][1];
      }
      position = guard.join();
    }
    if(visited[position]) {
      result++;
    }

  }
}

log(`result: ${result}`);


});
