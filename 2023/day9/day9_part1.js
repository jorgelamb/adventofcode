var lines = input.split("\n");

var result = lines.map(l => {
  var numbers = l.split(" ").map(n => parseInt(n));
  var levels = [numbers];
  while(true) {
    levels.push([]);
    var allZeroes = true;
    for(var i=0; i<levels[levels.length-2].length-1; i++) {
      levels[levels.length-1][i] = levels[levels.length-2][i+1]-levels[levels.length-2][i];
      if(levels[levels.length-1][i]!=0) {
        allZeroes = false;
      }
    }
    if(allZeroes) {
      levels[levels.length-1].push(0);
      for(var l=levels.length-2; l>=0; l--) {
        levels[l].push(levels[l][levels[l].length-1]+levels[l+1][levels[l+1].length-1]);
      }
      return levels[0][levels[0].length-1];
    }
  }
  
}).reduce((a, b) => a+b, 0);

log(`result: ${result}`);
