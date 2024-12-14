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
      antinodes.push({i: 2 * list[l1].i - list[l2].i, j: 2 * list[l1].j - list[l2].j});
      antinodes.push({i: -list[l1].i + 2* list[l2].i, j: -list[l1].j + 2* list[l2].j});
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
