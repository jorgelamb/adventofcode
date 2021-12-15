var map = input.split("\n").map(l => l.split("").map(n => parseInt(n)));

var result = 0;
for(var t=0; t<100; t++) {
  var hasFlashed = {};

  for(var i=0; i<10; i++) {
    for(var j=0; j<10; j++) {
      map[i][j]++;
    }
  }
  var anyFlash = true;
  while(anyFlash) {
    anyFlash = false;
    for(var i=0; i<10; i++) {
      for(var j=0; j<10; j++) {
        if(map[i][j] > 9) {
          result++;
          map[i][j] = 0;
          anyFlash = true;
          for(var ii=-1; ii<=1; ii++) {
            for(var jj=-1; jj<=1; jj++) {
              if(i+ii>=0 && i+ii<10 && j+jj>=0 && j+jj<10) {
                if((ii!=0 || jj!=0) && map[i+ii][j+jj] != 0) {
                  map[i+ii][j+jj]++;
                }
              }
            }
          }
        }
      }
    }
  }
}
log(`result: ${result}`);
