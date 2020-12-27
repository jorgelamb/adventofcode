var lines = input.split("\n");

var map = {};
var minX = 0;
var maxX = 0;
var minY = 0;
var maxY = 0;

lines.forEach(l => {
  var x = 0;
  var y = 0;
  while(l.length>0) {
    var d = l.charAt(0);
    if(d != "e" && d != "w") {
      d = l.substring(0, 2);
    }
    switch(d) {
      case "e":  x++;      break;
      case "w":  x--;      break;
      case "ne": x++; y++; break;
      case "nw":      y++; break;
      case "se":      y--; break;
      case "sw": x--; y--; break;
    }
    l = l.substring(d.length);
  }
  minX = Math.min(minX, x);
  maxX = Math.max(maxX, x);
  minY = Math.min(minY, y);
  maxY = Math.max(maxY, y);

  map[x+"_"+y] = ((map[x+"_"+y] || 0) + 1) % 2;
});

for(var turn=0; turn<100; turn++) {
  var newMap = {};
  for(var i=minX-1; i<=maxX+1; i++) {
    for(var j=minY-1; j<=maxY+1; j++) {
      var neighbours = 0;
      if(map[(i+1)+"_"+(j)] == 1) { neighbours++; }
      if(map[(i-1)+"_"+(j)] == 1) { neighbours++; }
      if(map[(i+1)+"_"+(j+1)] == 1) { neighbours++; }
      if(map[(i)+"_"+(j+1)] == 1) { neighbours++; }
      if(map[(i)+"_"+(j-1)] == 1) { neighbours++; }
      if(map[(i-1)+"_"+(j-1)] == 1) { neighbours++; }

      if(map[i+"_"+j] == 1) {
        if(neighbours==1 || neighbours==2) {
          newMap[i+"_"+j] = 1;
          minX = Math.min(minX, i);
          maxX = Math.max(maxX, i);
          minY = Math.min(minY, j);
          maxY = Math.max(maxY, j);
        }
      } else {
        if(neighbours==2) {
          newMap[i+"_"+j] = 1;
          minX = Math.min(minX, i);
          maxX = Math.max(maxX, i);
          minY = Math.min(minY, j);
          maxY = Math.max(maxY, j);
        }
      }
    }
  }
  map = newMap;
}

var total = Object.entries(map).filter(e => e[1]==1).length;

log("total: "+total);
