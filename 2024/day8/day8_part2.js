var map = input.split("\n").map(l => l.split(""));

var nodes = {};

for(var i=0; i<map.length; i++) {
  for(var j=0; j<map[0].length; j++) {
    if(map[i][j] != ".") {
      var node = nodes[map[i][j]] || [];
      node.push({i, j});
      nodes[map[i][j]] = node;
    }
  }
}
var antinodes = [];

Object.values(nodes).forEach(list => {
  for(var l1=0; l1<list.length; l1++) {
    for(var l2=l1+1; l2<list.length; l2++) {
      var ii=list[l2].i - list[l1].i;
      var jj=list[l2].j - list[l1].j;
      
      for(var rep=0; true; rep++) {
        var newI = list[l1].i + rep*ii;
        var newJ = list[l1].j + rep*jj;
        if(newI<0 || newI >= map.length || newJ<0 || newJ>=map[0].length) {
          break;
        }
        antinodes.push({i: newI, j: newJ});
      }
      for(var rep=-1; true; rep--) {
        var newI = list[l1].i + rep*ii;
        var newJ = list[l1].j + rep*jj;
        if(newI<0 || newI >= map.length || newJ<0 || newJ>=map[0].length) {
          break;
        }
        antinodes.push({i: newI, j: newJ});
      }
    }
  }
});

antinodes = antinodes.filter(e => e.i>=0 && e.j>=0 && e.i<map.length && e.j<map[0].length);
antinodes = antinodes.filter((e, idx) => {
  for(var a=0; a<idx; a++) {
    if(antinodes[idx].i == antinodes[a].i && antinodes[idx].j == antinodes[a].j) {
      return false;
    }
  }
  return true;
});

var result = antinodes.length;
log(`result: ${result}`);
