var lines = input.split("\n");

var map = {};
var result = 0;

for(var l=0; l<lines.length; l++) {
  var elements = lines[l].split("-");
  map[elements[0]] = map[elements[0]] || [];
  map[elements[0]].push(elements[1]);
  map[elements[1]] = map[elements[1]] || [];
  map[elements[1]].push(elements[0]);
}

var paths = [["start"]];
var visitedPaths = [];

for(var p=0; p<paths.length; p++) {
  var path = paths[p];
  var node = path[path.length-1];
  var neighbours = map[node];
  for(var n=0; n<neighbours.length; n++) {
    if(neighbours[n] == "end") {
      result++;
    } else if(canAdd(path, neighbours[n])) {
      var newPath = [...path];
      newPath.push(neighbours[n]);
      paths.push(newPath);
    }
  }
}

log(`result: ${result}`);

function canAdd(path, neighbour) {
  if(neighbour == "start") { return false; }
  if(neighbour != neighbour.toLowerCase()) { return true; }
  if(path.indexOf(neighbour) < 0) { return true; }
  if(path.filter(e => e == neighbour).length == 1) {
    //log(JSON.stringify(path.filter(p => p == p.toLowerCase()).reduce((b, a) => { b[a] = (b[a] || 0) + 1; return b; }, {})));
    var temp = path.filter(p => p == p.toLowerCase()).reduce((b, a) => { b[a] = (b[a] || 0) + 1; return b; }, {});
    var duplicates = Object.entries(temp).filter(e => e[1]>1).length;
    if(duplicates >= 1) {
      return false;
    }
  }
  if(path.filter(e => e == neighbour).length > 1) {
    return false;
  }

  return true;
}
