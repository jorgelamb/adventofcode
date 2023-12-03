var lines = input.split("\n");
var map = lines.map(l => l.split(""));

function isDigit(s) {
  return s.charCodeAt(0)>=48 && s.charCodeAt(0)<=57;
}

function isSymbol(s) {
  return s.charCodeAt(0)!=46 && !isDigit(s);
}

function isGear(s) {
  return s.charCodeAt(0) == 42;
}

function hasSymbol(map, startRow, endRow, startColumn, endColumn) {
  for(var i=Math.max(0, startRow); i<Math.min(map.length, endRow+1); i++) {
    for(var j=Math.max(0, startColumn); j<Math.min(map[0].length, endColumn+1); j++) {
      if(isSymbol(map[i][j])) {
        return true;
      }
    }
  }
  return false;
}

function isCloseToGear(startRow, endRow, startColumn, endColumn, gearRow, gearColumn) {
  return gearRow>=startRow && gearRow<=endRow && gearColumn>=startColumn && gearColumn<=endColumn;
}

var result = 0;

for(var ii=0; ii<map.length; ii++) {
  for(var jj=0; jj<map[0].length; jj++) {
    if(isGear(map[ii][jj])) {
      var numbers = [];
      for(var i=0; i<map.length; i++) {
        var startColumn = -1;
        var number = "";
        for(var j=0; j<map[0].length; j++) {
          if(isDigit(map[i][j])) {
            if(startColumn == -1) {
              startColumn = j;
              number = map[i][j];
            } else {
              number = number + map[i][j];
            }
          } else {
            if(startColumn != -1) {
              if(isCloseToGear(i-1, i+1, startColumn-1, j, ii, jj)) {
                numbers.push(parseInt(number));
              }
              startColumn = -1;
              number = "";
            }
          }
        }
        if(startColumn != -1) {
          if(isCloseToGear(i-1, i+1, startColumn-1, j, ii, jj)) {
            numbers.push(parseInt(number));
          }
          startColum = -1;
          number = "";
        }
      }
      if(numbers.length == 2) {
        result += numbers[0]*numbers[1];
      }
    }
  }
}

log(`result: ${result}`);
