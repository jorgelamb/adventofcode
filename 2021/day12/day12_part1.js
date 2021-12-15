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
    } else if(neighbours[n] != neighbours[n].toLowerCase() || path.indexOf(neighbours[n]) < 0) {
      var newPath = [...path];
      newPath.push(neighbours[n]);
      paths.push(newPath);
    }
    //log(JSON.stringify(paths));
  }
}

log(`result: ${result}`);
