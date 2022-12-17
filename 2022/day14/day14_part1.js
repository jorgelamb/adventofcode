var lines = input.split("\n");

var rocks = [];
var sand = {};
var maxDepth = 0;

lines.forEach(l => {
  var parts = l.split(" ");
  for(var i=2; i<parts.length; i+=2) {
    var p1 = parts[i-2].split(",");
    var p2 = parts[i].split(",");
    rocks.push([p1[0], p1[1], p2[0], p2[1]]);
    maxDepth = Math.max(maxDepth, Math.max(p1[1], p2[1]));
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
  return true;
}

var result = 0;
var out = false;
while(!out) {
  var x = 500;
  var y = 0;
  while(y<=maxDepth) {
    if(isFree(x, y+1)) {
      //log(`${x}, ${y}+1 is free`);
      y++;
    } else if(isFree(x-1, y+1)) {
      //log(`${x}-1, ${y}+1 is free`);
      x--;
      y++;
    } else if(isFree(x+1, y+1)) {
      //log(`${x}+1, ${y}+1 is free`);
      x++;
      y++;
    } else {
      //log(`${x}-1, ${y}+1 added sand. ${JSON.stringify(sand)}`);
      sand[x+"_"+y] = true;
      result++;
      break;
    }
  }
  if(y>maxDepth) {
    out = true;
  }
}
log(`result: ${result}`);
