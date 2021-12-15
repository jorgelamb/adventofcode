var map = input.split("\n").map(s => s.split("").map(n => parseInt(n)));

var queue = [];
queue.push([0, 0, 0]);

var visited = [];

var i=0;
while(true) {
  queue = queue.sort((a, b) => b[2]-a[2]);
  var current = queue.pop();
  i++; if((i%100)==0) { console.log(JSON.stringify(current)); }
  visited.push(current);
  if(current[0] == 5*map.length-1 && current[1] == 5*map[0].length-1) {
    log(current[2]); fail();
  }

  var x; var y;
  x = current[0]+1;  y = current[1];
  if(isValid(x, y) && !isVisited(x, y) && !isInQueue(x, y)) { queue.push([x, y, current[2]+getRisk(x, y)]); }
  x = current[0]-1;  y = current[1];
  if(isValid(x, y) && !isVisited(x, y) && !isInQueue(x, y)) { queue.push([x, y, current[2]+getRisk(x, y)]); }
  x = current[0];  y = current[1]+1;
  if(isValid(x, y) && !isVisited(x, y) && !isInQueue(x, y)) { queue.push([x, y, current[2]+getRisk(x, y)]); }
  x = current[0];  y = current[1]-1;
  if(isValid(x, y) && !isVisited(x, y) && !isInQueue(x, y)) { queue.push([x, y, current[2]+getRisk(x, y)]); }
}

log("no result");

function getRisk(x, y) {
  return ((map[x%map.length][y%map.length] + Math.floor(x/map.length) + Math.floor(y/map.length) - 1) % 9) + 1;
}

function isValid(x, y) {
  if(x<0 || y<0) { return false; }
  if(x>=5*map.length || y>=5*map[0].length) { return false; }
  return true;
}

function isVisited(x, y) {
  return visited.filter(e => e[0]==x && e[1]==y).length>0;
}

function isInQueue(x, y) {
  return queue.filter(e => e[0]==x && e[1]==y).length>0;
}
