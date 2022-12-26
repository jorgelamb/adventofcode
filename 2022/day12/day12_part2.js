const S = "S".charCodeAt(0);
const E = "E".charCodeAt(0);
const a = "a".charCodeAt(0);
const z = "z".charCodeAt(0);
const DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0]]; 

var map = input.split("\n").map(l => l.split("").map(s => s.charCodeAt(0)));

var pending = [];
var visited = [];
var goal;

for(var i=0; i<map.length; i++) {
  for(var j=0; j<map[0].length; j++) {
    if(map[i][j]==S) {
      map[i][j] = a;
    } else if(map[i][j]==E) {
      pending.push([i, j, 0]);
      map[i][j] = z;
    }
  }
}

while(pending.length > 0) {
  var current = pending.shift();
  var x = current[0];
  var y = current[1];
  visited.push([x, y]);
  
  for(var d=0; d<DIRECTIONS.length; d++) {
    var newX = x + DIRECTIONS[d][0];
    var newY = y + DIRECTIONS[d][1];
    
    if(newX < 0 || newX >= map.length || newY < 0 || newY >= map[0].length) {
      continue;
    }

    if(map[newX][newY] < map[x][y]-1) {
      continue;
    }
    
    if(map[newX][newY] == a) {
      log(current[2] + 1);
      exit();
    } else {
      var isVisited = visited.filter(e => e[0]==newX && e[1]==newY).length>0;
      if(!isVisited) {
        pending.push([newX, newY, current[2]+1]);
        visited.push([newX, newY]);
      }
    }
    pending = pending.sort((e1, e2) => e1[2]-e2[2]);
  }
}
log("no solution found");
