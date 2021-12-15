var lines = input.split("\n");
var map = lines.map(l => l.split("").map(n => parseInt(n)));

var basins = [];

for(var i=0; i<map.length; i++) {
  for(var j=0; j<map[0].length; j++) {
    if(map[i][j] != 9 && !isAlreadyInBasin(i, j)) {
      var basin = [];
      basin.push([i, j]);
      for(var k=0; k<basin.length; k++) {
        var ii = basin[k][0];
        var jj = basin[k][1];
        if(isValid(map, ii-1, jj) && map[ii-1][jj] != 9 && !isInBasin(basin, ii-1, jj)) { basin.push([ii-1, jj]); }
        if(isValid(map, ii+1, jj) && map[ii+1][jj] != 9 && !isInBasin(basin, ii+1, jj)) { basin.push([ii+1, jj]); }
        if(isValid(map, ii, jj-1) && map[ii][jj-1] != 9 && !isInBasin(basin, ii, jj-1)) { basin.push([ii, jj-1]); }
        if(isValid(map, ii, jj+1) && map[ii][jj+1] != 9 && !isInBasin(basin, ii, jj+1)) { basin.push([ii, jj+1]); }
      }
      log(JSON.stringify(basin));
      basins.push(basin);
    }
  }
}
var sizes = basins.map(b => b.length).sort((a, b) => b-a).splice(0, 3);
var result = 1;
for(var s=0; s<sizes.length; s++) { result *= sizes[s]; }

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

function isInBasin(b, i, j) {
  for(var k=0; k<b.length; k++) {
    if(b[k][0] == i && b[k][1] == j) { return true; }
  }
  return false;
}

function isAlreadyInBasin(i, j) {
  for(var b=0; b<basins.length; b++) {
    for(var k=0; k<basins[b].length; k++) {
      if(basins[b][k][0] == i && basins[b][k][1] == j) { return true; }
    }
  }
  return false;
}
