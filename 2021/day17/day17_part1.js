var lines = input.split("\n");
var parts = lines[0].split(/[ =.,]/g);
var minX = parseInt(parts[3]);
var maxX = parseInt(parts[5]);
var minY = parseInt(parts[8]);
var maxY = parseInt(parts[10]);

var result = minY;
for(var i=0; i<=maxX; i++) {
  if(!canReach(minX, i)) { continue; }
  for(var j=minY; j<=Math.abs(minY); j++) {
    var temp = shoot(i, j, minX, maxX, minY, maxY);
    if(temp > result) {
      result = temp;
    }
  }
}

log(`result: ${result}`);

function shoot(vX, vY, minX, maxX, minY, maxY) {
  var x = 0;
  var y = 0;
  var highest = y;
  while(x<= maxX && y>=minY) {
    x+=vX;
    y+=vY;
    highest = Math.max(y, highest);
    if(vX>0) { vX--; } else if(x<0) { vX++; }
    vY--;
    if(minX<=x && x<=maxX && minY<=y && y<=maxY) {
      return highest;
    }
  }
  return minY;
}

function canReach(x, vX) {
  return (vX+1)*vX/2 >= x;
}
