var lines = input.split("\n");
const directions = [
  [0, 0, -1],
  [0, 1, 0],
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
];

var exteriorCache = {};

var minX = 0;
var maxX = 0;
var minY = 0;
var maxY = 0;
var minZ = 0;
var maxZ = 0;
lines.forEach(l => {
  minX = Math.min(minX, parseInt(l.split(",")[0]));
  maxX = Math.max(maxX, parseInt(l.split(",")[0]));
  minY = Math.min(minY, parseInt(l.split(",")[1]));
  maxY = Math.max(maxY, parseInt(l.split(",")[1]));
  minZ = Math.min(minZ, parseInt(l.split(",")[2]));
  maxZ = Math.max(maxZ, parseInt(l.split(",")[2]));
});

var result = 0;
lines.forEach(l => {
  var position = l.split(",").map(e => parseInt(e));
  directions.forEach(d => {
    var startPosition = position.map((e, idx) => e+d[idx]);
    var startKey = startPosition.join(",");
    
    if(lines.indexOf(startKey)>=0) {
      return false;
    }

    if(typeof exteriorCache[startKey] == 'undefined') {
      var isExterior = false;
      var pending = [startPosition];
      var visited = [startPosition.join(",")];
      
      while(pending.length>0 && !isExterior) {
        var current = pending.pop();
        directions.forEach(searchDirection => {
          var next = current.map((e, idx) => e+searchDirection[idx]);
          if(lines.indexOf(next.join(","))<0) {
            if(
                  next[0]<minX || next[0]>maxX
               || next[1]<minY || next[1]>maxY
               || next[2]<minZ || next[2]>maxZ
            ) {
              isExterior = true;
              return;
            } else {
              if(visited.indexOf(next.join(","))<0) {
                pending.push(next);
                visited.push(next.join(","));
              }
            }
          }
        });
      }
      exteriorCache[startKey] = isExterior;
    }
    if(exteriorCache[startKey]) {
      result++;
    }
  });
});

log(`result: ${result}`);
