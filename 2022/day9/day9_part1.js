var lines = input.split("\n");

var head = [0, 0];
var tail = [0, 0];

var visited = {};
visited[tail[0]+"_"+tail[1]] = true;

lines.forEach(l => {
  var direction = l.split(" ")[0];
  var count = parseInt(l.split(" ")[1]);
  for(var i=0; i<count; i++) {
    switch(direction) {
      case "U": head[1]++; break;
      case "D": head[1]--; break;
      case "R": head[0]++; break;
      case "L": head[0]--; break;
    }
    //log(`  ${head[0]}, ${head[1]} - ${tail[0]}, ${tail[1]}   ${direction}  ${Math.abs(head[0]-tail[0])+Math.abs(head[1]-tail[1])}`);
    if(head[0]==tail[0] && head[1]==tail[1]) {
      // Do nothing
    } else if(Math.abs(head[0]-tail[0])+Math.abs(head[1]-tail[1])>2) {
      if(head[0]>tail[0]) {
        tail[0]++;
      } else {
        tail[0]--;
      }
      if(head[1]>tail[1]) {
        tail[1]++;
      } else {
        tail[1]--;
      }
    } else {
      if(head[0]>tail[0]+1) {
        tail[0]++;
      } else if(head[0]<tail[0]-1) {
        tail[0]--;
      }
      if(head[1]>tail[1]+1) {
        tail[1]++;
      } else if(head[1]<tail[1]-1) {
        tail[1]--;
      }
    }
    //log(tail[0]+", "+tail[1]);
    visited[tail[0]+"_"+tail[1]] = true;
  }
});

var result = Object.keys(visited).length;
log(`result: ${result}`);
