var lines = input.split("\n");
var map = lines.map(l => l.split(""));

var start;
for(var i=0; i<map.length; i++) {
  for(var j=0; j<map[0].length; j++) {
    if(map[i][j]=="S") {
      start = [i, j];
      break;
    }
  }
}

function isValid(position) {
  return position[0]>=0 && position[0]<map.length && position[1]>=0 && position[1]<map[0].length;
}

function nextPosition(position, direction) {
  switch(direction) {
    case "N": return [position[0]-1, position[1]];
    case "S": return [position[0]+1, position[1]];
    case "E": return [position[0], position[1]+1];
    case "W": return [position[0], position[1]-1];
  }
}

function nextDirection(position, direction) {
  switch(map[position[0]][position[1]]) {
    case "S":
      return direction;
      
    case "|":
      if(direction=="N" || direction=="S") {
        return direction;
      } else {
        return null;
      }
    case "-":
      if(direction=="E" || direction=="W") {
        return direction;
      } else {
        return null;
      }
    case "L":
      if(direction=="W") {
        return "N";
      } else if(direction=="S") {
        return "E";
      } else {
        return null;
      }
    case "J":
      if(direction=="E") {
        return "N";
      } else if(direction=="S") {
        return "W";
      } else {
        return null;
      }
    case "7":
      if(direction=="E") {
        return "S";
      } else if(direction=="N") {
        return "W";
      } else {
        return null;
      }
    case "F":
      if(direction=="W") {
        return "S";
      } else if(direction=="N") {
        return "E";
      } else {
        return null;
      }
    default: return null;
  }
}

function findLoop(start, direction) {
  var current = start;
  var count = 0;
  do {
    count++;
    current = nextPosition(current, direction);
    direction = nextDirection(current, direction);
    if(!isValid(current) || direction==null) {
      return -1;
    }
  } while( ! (current[0]==start[0] && current[1]==start[1]));
  return count;
}

var best = map.length*map[0].length+1;

var temp = findLoop(start, "N");
if(temp>=0 && temp<best) {
  best = temp;
}

temp = findLoop(start, "E");
if(temp>=0 && temp<best) {
  best = temp;
}

temp = findLoop(start, "W");
if(temp>=0 && temp<best) {
  best = temp;
}

temp = findLoop(start, "S");
if(temp>=0 && temp<best) {
  best = temp;
}

var result = "";
log(`result: ${result}`);
