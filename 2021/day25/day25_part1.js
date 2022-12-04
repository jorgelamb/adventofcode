var lines = input.split("\n");

var map = [];
for(var l=0; l<lines.length; l++) {
  map.push(lines[l].split(""));
}

var WIDTH = map[0].length;
var HEIGHT = map.length;

var moved = true;
for(var step=0; moved && step<1000; step++) {
  moved = false;
  
  var toMove = [];
  for(x=0; x<WIDTH; x++) {
    for(y=0; y<HEIGHT; y++) {
      if(map[y][x]==">" && map[y][(x+1)%WIDTH]==".") {
        toMove.push([x, y]);
      }
    }
  }
  if(toMove.length>0) {
    moved = true;
    for(var m=0; m<toMove.length; m++) {
      map[toMove[m][1]][toMove[m][0]] = ".";
      map[toMove[m][1]][(toMove[m][0]+1)%WIDTH] = ">";
    }
  }

  toMove = [];
  for(x=0; x<WIDTH; x++) {
    for(y=0; y<HEIGHT; y++) {
      if(map[y][x]=="v" && map[(y+1)%HEIGHT][x]==".") {
        toMove.push([x, y]);
      }
    }
  }
  if(toMove.length>0) {
    moved = true;
    for(var m=0; m<toMove.length; m++) {
      map[toMove[m][1]][toMove[m][0]] = ".";
      map[(toMove[m][1]+1)%HEIGHT][toMove[m][0]] = "v";
    }
  }
}

log(step);
