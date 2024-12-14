var fs = require('fs');

function log(o) {
  console.log(JSON.stringify(o));
}

const TEST = true;

const FILENAME = process.argv[2];
fs.readFile(FILENAME, 'utf8', function(err, data) {
  if (err) throw err;
  var input = data.trim();


var map = input.split("\n").map(e => e.split("").map(c => { return {c, checked: false} }));

var result = 0;

for(var i=0; i<map.length; i++) {
  for(var j=0; j<map[0].length; j++) {
    if(map[i][j].checked) {
      continue;
    }
    
    var region = [];
    var pending = [];
    var edges = [];
    var perimeter = 0;
    pending.push({x: i, y: j});
    region.push(i+"_"+j);
    map[i][j].checked = true;
    while(pending.length>0) {
      var current = pending.pop();
      [[0, 1, 0], [1, 0, 1], [0, -1, 2], [-1, 0, 3]].forEach(direction => {
        var next = {x: current.x+direction[0], y: current.y+direction[1]};
        if(next.x>=0 && next.y>=0 && next.x<map.length && next.y<map[0].length) {
          if(map[next.x][next.y].c == map[current.x][current.y].c) {
            if(region.indexOf(next.x+"_"+next.y)<0) {
              pending.push(next);
              region.push(next.x+"_"+next.y);
              map[next.x][next.y].checked = true;
            }
          } else {
            perimeter++;
            edges.push(direction[2]+"_"+next.x+"_"+next.y);
          }
        } else {
          perimeter++;
          edges.push(direction[2]+"_"+next.x+"_"+next.y);
        }
      });
    }
    edges = edges.sort((a, b) => {
      var partsA = a.split("_").map(e => e-0);
      var partsB = b.split("_").map(e => e-0);
      if(partsA[0] < partsB[0]) {
        return -1;
      } else if(partsA[0] > partsB[0]) {
        return 1;
      } else {
        if(partsA[1] < partsB[1]) {
          return -1;
        } else if(partsA[1] > partsB[1]) {
          return 1;
        } else {
          if(partsA[2] < partsB[2]) {
            return -1;
          } else if(partsA[2] > partsB[2]) {
            return 1;
          } else {
            return 0;
	  }
        }
      }
    });

    var sides = 0;
    edges.forEach(edge => {
      var parts = edge.split("_").map(e => e-0);
      if(parts[0] == 0 || parts[0] == 2) {
        if(edges.indexOf(parts[0]+"_"+(parts[1]-1)+"_"+parts[2])<0) {
          sides++;
	}
      } else if(parts[0] == 1 || parts[0] == 3) {
        if(edges.indexOf(parts[0]+"_"+parts[1]+"_"+(parts[2]-1))<0) {
          sides++;
	}
      }
    });

    result += sides*region.length;
  }
}

log(`result: ${result}`);


});
