var map = input.split("\n").map(s => s.split("").map(n => parseInt(n)));

var queue = [];
queue.push([0, 0, 0]);

var visited = [];

while(true) {
  queue = queue.sort((a, b) => b[2]-a[2]);
  var current = queue.pop();
  //log(JSON.stringify(current));
  visited.push(current);
  if(current[0] == map.length-1 && current[1] == map[0].length-1) {
    log(current[2]); fail();
  }

  var x; var y;
  x = current[0]+1;  y = current[1];
  if(isValid(x, y) && !isVisited(x, y) && !isInQueue(x, y)) { queue.push([x, y, current[2]+map[x][y]]); }
  x = current[0]-1;  y = current[1];
  if(isValid(x, y) && !isVisited(x, y) && !isInQueue(x, y)) { queue.push([x, y, current[2]+map[x][y]]); }
  x = current[0];  y = current[1]+1;
  if(isValid(x, y) && !isVisited(x, y) && !isInQueue(x, y)) { queue.push([x, y, current[2]+map[x][y]]); }
  x = current[0];  y = current[1]-1;
  if(isValid(x, y) && !isVisited(x, y) && !isInQueue(x, y)) { queue.push([x, y, current[2]+map[x][y]]); }
}

function isValid(x, y) {
  if(x<0 || y<0) { return false; }
  if(x>=map.length || y>=map[0].length) { return false; }
  return true;
}

function isVisited(x, y) {
  return visited.filter(e => e[0]==x && e[1]==y).length>0;
}

function isInQueue(x, y) {
  return queue.filter(e => e[0]==x && e[1]==y).length>0;
}
