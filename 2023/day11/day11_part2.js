var lines = input.split("\n");
var map = lines.map(l => l.split(""));

var positions = [];
var expandedRows = [];
var expandedColumns = [];

for(var i=0; i<map.length; i++) {
  var emptyRow = true;
  for(var j=0; j<map[0].length; j++) {
    if(map[i][j]=="#") {
      positions.push([i, j]);
      emptyRow = false;
    }
  }
  if(emptyRow) {
    expandedRows.push(i);
  }
}

for(var j=0; j<map[0].length; j++) {
  var emptyColumn = true;
  for(var i=0; i<map.length; i++) {
    if(map[i][j]=="#") {
      emptyColumn = false;
    }
  }
  if(emptyColumn) {
    expandedColumns.push(j);
  }
}

var result = 0;
for(var a=0; a<positions.length; a++) {
  for(b=a+1; b<positions.length; b++) {
    var pA = positions[a];
    var pB = positions[b];
    var distance = Math.abs(pA[0]-pB[0]) + Math.abs(pA[1]-pB[1]);
    distance += expandedRows.filter(r => (r>pA[0] && r<pB[0]) || (r<pA[0] && r>pB[0])).length * 999999;
    distance += expandedColumns.filter(r => (r>pA[1] && r<pB[1]) || (r<pA[1] && r>pB[1])).length * 999999;
    result += distance;
  }
}

log(`result: ${result}`);
