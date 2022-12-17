var lines = input.split("\n");

var root = {
  size: 0,
  totalSize: 0
};
var allNodes = [];

function getNode(path) {
  var node = root;
  for(var p=0; p<path.length; p++) {
    if(!node[path[p]]) {
      var newNode = {};
      newNode.size = 0;
      newNode.totalSize = 0;
      node[path[p]] = newNode;
      allNodes.push(newNode);
    }
    node = node[path[p]];
  }
  return node;
}

var currentPath = [];
for(var i=0; i<lines.length; i++) {
  var lineSplit = lines[i].split(" ");
  if(lines[i] == "$ cd /") {
    currentPath = [];
  } else if(lines[i] == "$ cd ..") {
    currentPath.pop();
  } else if(lineSplit[1] == "cd") {
    currentPath.push(lineSplit[2]);
  } else if(lines[i] == "$ ls") {
  } else if(lineSplit[0] == "dir") {
    var dirNode = getNode(currentPath.concat([lineSplit[1]]));
  } else {
    var node = getNode(currentPath);
    node.size += parseInt(lineSplit[00]);
    for(var l=0; l<=currentPath.length; l++) {
      node = getNode(currentPath.slice(0, l));
      node.totalSize += parseInt(lineSplit[0]);
    }
  }
}

const TOTAL = 70000000;
const REQUIRED = 30000000;
var unused = TOTAL - root.totalSize;
var toFree = REQUIRED - unused;

var result = allNodes.filter(n => n.totalSize >= toFree).sort((a, b) => a-b);
log(result.pop().totalSize);
