var lines = input.split("\n");

var trees = lines.map(l => l.split("").map(n => parseInt(n)));

var result = 0;
for(var i=1; i<trees.length-1; i++) {
  for(var j=1; j<trees[0].length-1; j++) {
    var found = false;
    
    found = false;
    var n = 0;
    for(var ii=i+1; ii<trees.length && !found; ii++) {
      if(trees[ii][j]<trees[i][j]) {
        n++;
      } else {
        n++;
        found = true;
      }
    }
    
    found = false;
    var s = 0;
    for(var ii=i-1; ii>=0 && !found; ii--) {
      if(trees[ii][j]<trees[i][j]) {
        s++;
      } else {
        s++;
        found = true;
      }
    }
    
    found = false;
    var e = 0;
    for(var jj=j+1; jj<trees[0].length && !found; jj++) {
      if(trees[i][jj]<trees[i][j]) {
        e++;
      } else {
        e++;
        found = true;
      }
    }
    
    found = false;
    var w = 0;
    for(var jj=j-1; jj>=0 && !found; jj--) {
      if(trees[i][jj]<trees[i][j]) {
        w++;
      } else {
        w++;
        found = true;
      }
    }
    
    //log(` ${i}, ${j}   ${n} ${s} ${e} ${w} ${s*n*e*w}`);
    if(s*n*e*w > result) {
      result = s*n*e*w;
    }
  }
}

log(`result: ${result}`);
