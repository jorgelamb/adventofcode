var lines = input.split("\n");

var trees = lines.map(l => l.split("").map(n => parseInt(n)));

var result = 0;
var viewable = {};

for(var i=0; i<trees.length; i++) {
  var prev = -1;
  for(var j=0; j<trees[0].length; j++) {
    if(trees[i][j]>prev) {
      prev = trees[i][j];
      if(!viewable[i+"_"+j]) {
        viewable[i+"_"+j] = true;
        result++;
      }
    }
  }
  
  prev = -1;
  for(var j=trees[0].length-1; j>=0; j--) {
    if(trees[i][j]>prev) {
      prev = trees[i][j];
      if(!viewable[i+"_"+j]) {
        viewable[i+"_"+j] = true;
        result++;
      }
    }
  }
}

for(var j=0; j<trees[0].length; j++) {
  var prev = -1;
  for(var i=0; i<trees.length; i++) {
    if(trees[i][j]>prev) {
      prev = trees[i][j];
      if(!viewable[i+"_"+j]) {
        viewable[i+"_"+j] = true;
        result++;
      }
    }
  }
  
  prev = -1;
  for(var i=trees.length-1; i>=0; i--) {
    if(trees[i][j]>prev) {
      prev = trees[i][j];
      if(!viewable[i+"_"+j]) {
        viewable[i+"_"+j] = true;
        result++;
      }
    }
  }
}

log(`result: ${result}`);
