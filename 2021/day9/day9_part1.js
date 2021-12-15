var lines = input.split("\n");
var map = lines.map(l => l.split("").map(n => parseInt(n)));

var result = 0;

for(var i=0; i<map.length; i++) {
  for(var j=0; j<map[0].length; j++) {
    if(isMin(map, i, j)) {
      result += map[i][j]+1;
    }
  }
}
log(`result: ${result}`);

function isValid(map, i, j) {
  if(i<0 || j<0) { return false; }
  if(i>=map.length) { return false; }
  if(j>=map[0].length) { return false; }
  return true;
}

function isMin(map, i, j) {
  if(isValid(map, i-1, j) && map[i-1][j] <= map[i][j]) { return false; }
  if(isValid(map, i, j-1) && map[i][j-1] <= map[i][j]) { return false; }
  if(isValid(map, i+1, j) && map[i+1][j] <= map[i][j]) { return false; }
  if(isValid(map, i, j+1) && map[i][j+1] <= map[i][j]) { return false; }
  return true;
}
