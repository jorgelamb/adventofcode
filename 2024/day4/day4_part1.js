var matrix = input.split("\n").map(l => l.split(""));

var XMAS = "XMAS".split("");
var DIRECTIONS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

var result = 0;
for(var i=0; i<matrix.length; i++) {
  for(var j=0; j<matrix[0].length; j++) {
    for(var d=0; d<DIRECTIONS.length; d++) {
      var found = true;
      for(var c=0; c<XMAS.length && found; c++) {
        var x = i+c*DIRECTIONS[d][0];
        var y = j+c*DIRECTIONS[d][1];
        if(x<0 || y<0 || x>=matrix.length || y>=matrix[0].length) {
          found = false;
        } else if(matrix[x][y] != XMAS[c]) {
          found = false;
          break;
        }
      }
      if(found) {
        result++;
      }
    }
  }
}

log(`result: ${result}`);
