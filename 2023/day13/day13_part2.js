var blocks = input.split("\n\n");

var result = blocks.map(block => {
  var map = block.split("\n").map(l => l.split(""));
  
  // rows
  for(var i=0; i<map.length-1; i++) {
    var isMirror = true;
    var differences = 0;
    for(var ii=0; isMirror && i-ii>=0 && i+1+ii<map.length; ii++) {
      for(j=0;  isMirror && j<map[0].length; j++) {
        if(map[i-ii][j]!=map[i+1+ii][j]) {
          differences++;
          if(differences>1) {
            isMirror=false;
          }
        }
      }
    }
    if(isMirror && differences==1) {
      return (i+1)*100;
    }
  }

  // columns
  for(var j=0; j<map[0].length-1; j++) {
    var isMirror = true;
    var differences = 0;
    for(var jj=0; isMirror && j-jj>=0 && j+1+jj<map[0].length; jj++) {
      for(i=0;  isMirror && i<map.length; i++) {
        if(map[i][j-jj]!=map[i][j+1+jj]) {
          differences++;
          if(differences>1) {
            isMirror=false;
          }
        }
      }
    }
    if(isMirror && differences==1) {
      return (j+1);
    }
  }

  return 0;
}).reduce((a, b) => a+b, 0);

log(`result: ${result}`);
