var lines = input.split("\n");

var count = {};

var result = 0;
for(var i=0; i<lines.length; i++) {
  var parts=lines[i].split(" ");
  var x1=parseInt(parts[0].split(",")[0]);
  var y1=parseInt(parts[0].split(",")[1]);
  var x2=parseInt(parts[2].split(",")[0]);
  var y2=parseInt(parts[2].split(",")[1]);

  var xStep = 1;
  if(x2<x1) {
    xStep = -1;
  } else if(x1==x2) {
    xStep = 0;
  }
  var yStep = 1;
  if(y2<y1) {
    yStep = -1;
  } else if(y1==y2) {
    yStep = 0;
  }
  var x = x1;
  var y = y1;
  while(((x>=x1 && x<=x2) || (x>=x2 && x<=x1)) && ((y>=y1 && y<=y2) || (y>=y2 && y<=y1))) {
    var id = `x${x}_y${y}`;
    count[id] = (count[id] || 0) + 1;
    if(count[id] == 2) {
      result++;
    }
    x += xStep;
    y += yStep;
  }
}
log(`result: ${result}`);
