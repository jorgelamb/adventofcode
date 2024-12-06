var matrix = input.split("\n").map(l => l.split(""));

var result = 0;
for(var i=1; i<matrix.length-1; i++) {
  for(var j=1; j<matrix[0].length-1; j++) {
    if(matrix[i][j] == "A") {
      var d1 = (matrix[i-1][j-1] == "M" && matrix[i+1][j+1] == "S") || (matrix[i-1][j-1] == "S" && matrix[i+1][j+1] == "M");
      var d2 = (matrix[i+1][j-1] == "M" && matrix[i-1][j+1] == "S") || (matrix[i+1][j-1] == "S" && matrix[i-1][j+1] == "M");
      if(d1 && d2) {
        result++;
      }
    }
  }
}

log(`result: ${result}`);
