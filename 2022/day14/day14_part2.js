var lines = input.split("\n");

var rocks = [];
var sand = {};
var maxDepth = 0;
var floor = maxDepth + 2;

lines.forEach(l => {
  var parts = l.split(" ");
  for(var i=2; i<parts.length; i+=2) {
    var p1 = parts[i-2].split(",");
    var p2 = parts[i].split(",");
    rocks.push([p1[0], p1[1], p2[0], p2[1]]);
    maxDepth = Math.max(maxDepth, Math.max(p1[1], p2[1]));
    floor = maxDepth + 2;
  }
});

function isFree(x, y) {
  if(sand[x+"_"+y]) {
    return false;
  }
  for(var r=0; r<rocks.length; r++) {
    if(x>=Math.min(rocks[r][0], rocks[r][2]) && x<=Math.max(rocks[r][0], rocks[r][2])
       && y>=Math.min(rocks[r][1], rocks[r][3]) && y<=Math.max(rocks[r][1], rocks[r][3])) {
      return false;
    }
  }
  if(y == floor) {
    return false;
  }
  return true;
}

function isVisited(visited, coords) {
  var filtered = visited.filter(v => v[0]==coords[0] && v[1]==coords[1]);
  return filtered.length>0;
}

var result = 0;
var out = false;
var pending = [[500, 0]];
var visited = [[500, 0]];

while(pending.length > 0) {
  var current = pending.shift();
  var x = current[0];
  var y = current[1];
  if(isFree(x, y+1)) {
    //log(`${x}, ${y}+1 is free`);
    var next = [x, y+1];
    if(!isVisited(visited, next)) {
      visited.push(next);
      pending.push(next);
    }
  }
  if(isFree(x-1, y+1)) {
    //log(`${x}-1, ${y}+1 is free`);
    var next = [x-1, y+1];
    if(!isVisited(visited, next)) {
      visited.push(next);
      pending.push(next);
    }
  }
  if(isFree(x+1, y+1)) {
    //log(`${x}-1, ${y}+1 is free`);
    var next = [x+1, y+1];
    if(!isVisited(visited, next)) {
      visited.push(next);
      pending.push(next);
    }
  }
}
log(`result: ${visited.length}`);
