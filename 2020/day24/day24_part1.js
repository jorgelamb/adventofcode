var lines = input.split("\n");

var map = {};

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
  map[x+"_"+y] = ((map[x+"_"+y] || 0) + 1) % 2;
});

var total = Object.entries(map).filter(e => e[1]==1).length;

log("total: "+total);
