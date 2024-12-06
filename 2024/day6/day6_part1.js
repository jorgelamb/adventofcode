var matrix = input.split("\n").map(l => l.split(""));

var DIRECTIONS = [ [-1, 0], [0, 1], [1, 0], [0, -1] ];

var guard = [-1, -1, 0];
for(var i=0; i<matrix.length; i++) {
  for(var j=0; j<matrix[0].length; j++) {
    if(matrix[i][j] == "^") {
      guard[0] = i;
      guard[1] = j;
    }
  }
}

var result = 0;

while(guard[0]>=0 && guard[0]<matrix.length && guard[1]>=0 && guard[1]<matrix[0].length) {
  if(matrix[guard[0]][guard[1]] == "." || matrix[guard[0]][guard[1]] == "^") {
    matrix[guard[0]][guard[1]] = "X";
    result++;
  }
  if(guard[0]+DIRECTIONS[guard[2]][0]>=0 && guard[0]+DIRECTIONS[guard[2]][0]<matrix.length && guard[1]+DIRECTIONS[guard[2]][1]>=0 && guard[1]+DIRECTIONS[guard[2]][1]<matrix[0].length && matrix[ guard[0]+DIRECTIONS[guard[2]][0] ][ guard[1]+DIRECTIONS[guard[2]][1] ] == "#") {
    guard[2] = (guard[2]+1)%DIRECTIONS.length;
  } else {
    guard[0] += DIRECTIONS[guard[2]][0];
    guard[1] += DIRECTIONS[guard[2]][1];
  }
}

log(`result: ${result}`);
