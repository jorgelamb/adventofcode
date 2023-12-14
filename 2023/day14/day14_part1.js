var lines = input.split("\n");
var map = lines.map(l => l.split(""));

var rocks = [];
for(var i=0; i<map.length; i++) {
  for(var j=0; j<map[0].length; j++) {
    switch(map[i][j]) {
      case "#":
        rocks.push([i, j, "#"]);
        break;
      case "O":
        rocks.push([i, j, "O"]);
        break;
    }
  }
}

function moveNorth() {
  rocks.sort((a, b) => a[0]-b[0]);
  for(var r=0; r<rocks.length; r++) {
    var rock = rocks[r];
    if(rock[2]=="O") {
      var filtered = rocks.filter(e => e[1]==rock[1] && e[0]<rock[0]);
      if(filtered.length>0) {
        rocks[r][0]=filtered[filtered.length-1][0]+1;
      } else {
        rocks[r][0]=0;
      }
    }
  }
}

moveNorth();

var movable = rocks.filter(e => e[2]=="O");
var result = 0;
for(var j=0; j<map[0].length; j++) {
  for(var i=0; i<map.length; i++) {
    if(movable.filter(e => e[0]==i && e[1]==j).length>0) {
      result += map.length-i;
    }
  }
}

log(`result: ${result}`);
