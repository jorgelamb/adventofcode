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
    var perimeter = 0;
    pending.push({x: i, y: j});
    region.push(i+"_"+j);
    map[i][j].checked = true;
    while(pending.length>0) {
      var current = pending.pop();
      [[0, 1], [1, 0], [0, -1], [-1, 0]].forEach(direction => {
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
          }
        } else {
          perimeter++;
        }
      });
    }
    
    result += perimeter*region.length;
  }
}

log(`result: ${result}`);


});
