var lines = input.split("\n");

var minX = 0;
var minY = 0;
var minZ = 0;
var minW = 0;
var maxX = 0;
var maxY = 0;
var maxZ = 0;
var maxW = 0;
var map = {};
var total = 0;

var k = 0;
var l = 0;
for(var i=0; i<lines.length; i++) {
  for(var j=0; j<lines[i].length; j++) {
    map[i] = map[i] || {};
    map[i][j] = map[i][j] || {};
    map[i][j][k] = map[i][j][k] || {};
    map[i][j][k][l] = lines[i].charAt(j);
    maxX = i;
    maxY = j;
    maxZ = k;
    maxW = l;
    if(map[i][j][k][l]=='#') {
      total++;
    }
  }
}

for(var c=0; c<6; c++) {
  var newMap = JSON.parse(JSON.stringify(map));

  for(var i=minX-1; i<=maxX+1; i++) {
    for(var j=minY-1; j<=maxY+1; j++) {
      for(var k=minZ-1; k<=maxZ+1; k++) {
       for(var l=minW-1; l<=maxW+1; l++) {
        var neighbours = 0;
        for(var ii=-1; ii<=1; ii++) {
          for(var jj=-1; jj<=1; jj++) {
            for(var kk=-1; kk<=1; kk++) {
             for(var ll=-1; ll<=1; ll++) {
              if(ii!=0 || jj!=0 || kk!=0 || ll!=0) {
                if( ((((map[i+ii]||{})[j+jj]||{})[k+kk]||{})[l+ll]||'.') == '#' ) {
                  neighbours++;
                }
              }
             }
            }
          }
        }
        if( ((((newMap[i]||{})[j]||{})[k]||{})[l]||'.') == '#' ) {
          if(neighbours<2 || neighbours>3) {
            newMap[i] = newMap[i] || {};
            newMap[i][j] = newMap[i][j] || {};
            newMap[i][j][k] = newMap[i][j][k] || {};
            newMap[i][j][k][l] = '.';
            total--;
          }
        } else {
          if(neighbours==3) {
            newMap[i] = newMap[i] || {};
            newMap[i][j] = newMap[i][j] || {};
            newMap[i][j][k] = newMap[i][j][k] || {};
            newMap[i][j][k][l] = '#';
            minX = Math.min(minX, i);
            minY = Math.min(minY, j);
            minZ = Math.min(minZ, k);
            minW = Math.min(minW, l);
            maxX = Math.max(maxX, i);
            maxY = Math.max(maxY, j);
            maxZ = Math.max(maxZ, k);
            maxW = Math.max(maxW, l);
            total++;
          }
        }
       }
      }
    }
  }
  map = newMap;
}

log("result: "+total);
