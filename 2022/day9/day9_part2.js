var lines = input.split("\n");

var nodes = [];
for(var i=0; i<10; i++) {
  nodes.push([0, 0]);
}

var visited = {};
visited[nodes[9][0]+"_"+nodes[9][1]] = true;

var head = nodes[0];

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
    for(var n=1; n<10; n++) {
      //log(`  ${n}: ${nodes[n-1][0]}, ${nodes[n-1][1]} - ${tail[0]}, ${tail[1]}   ${direction}  ${Math.abs(head[0]-tail[0])+Math.abs(head[1]-tail[1])}`);
      if(nodes[n-1][0]==nodes[n][0] && nodes[n-1][1]==nodes[n][1]) {
        // Do nothing
      } else if(Math.abs(nodes[n-1][0]-nodes[n][0])+Math.abs(nodes[n-1][1]-nodes[n][1])>2) {
        if(nodes[n-1][0]>nodes[n][0]) {
          nodes[n][0]++;
        } else {
          nodes[n][0]--;
        }
        if(nodes[n-1][1]>nodes[n][1]) {
          nodes[n][1]++;
        } else {
          nodes[n][1]--;
        }
      } else {
        if(nodes[n-1][0]>nodes[n][0]+1) {
          nodes[n][0]++;
        } else if(nodes[n-1][0]<nodes[n][0]-1) {
          nodes[n][0]--;
        }
        if(nodes[n-1][1]>nodes[n][1]+1) {
          nodes[n][1]++;
        } else if(nodes[n-1][1]<nodes[n][1]-1) {
          nodes[n][1]--;
        }
      }
      //log(nodes[9][0]+", "+nodes[9][1]);
    }
    visited[nodes[9][0]+"_"+nodes[9][1]] = true;
  }
});

var result = Object.keys(visited).length;
log(`result: ${result}`);
