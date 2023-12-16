function calculate(i, j, direction) {
  var map = input.split("\n").map(l => l.split("").map(e => { return { c: e, energized: false }; }));
  var pending = [[i, j, direction]];
  var processed = [];
  var result = 0;

  while(pending.length>0) {
    var current = pending.pop();
    if(processed.filter(e => e[0]==current[0] && e[1]==current[1] && e[2]==current[2]).length>0) {
      continue;
    }

    if(current[0]<0 || current[0]>=map.length || current[1]<0 || current[1]>=map[0].length) {
      continue;
    }

    if(!map[current[0]][current[1]].energized) {
      map[current[0]][current[1]].energized = true;
      result++;
    }

    switch(map[current[0]][current[1]].c) {
      case ".":
        switch(current[2]) {
          case "E": pending.push([current[0], current[1]+1, current[2]]); break;
          case "S": pending.push([current[0]+1, current[1], current[2]]); break;
          case "W": pending.push([current[0], current[1]-1, current[2]]); break;
          case "N": pending.push([current[0]-1, current[1], current[2]]); break;
        }
        break;

      case "\\":
        switch(current[2]) {
          case "E": pending.push([current[0]+1, current[1], "S"]); break;
          case "S": pending.push([current[0], current[1]+1, "E"]); break;
          case "W": pending.push([current[0]-1, current[1], "N"]); break;
          case "N": pending.push([current[0], current[1]-1, "W"]); break;
        }
        break;

      case "/":
        switch(current[2]) {
          case "E": pending.push([current[0]-1, current[1], "N"]); break;
          case "S": pending.push([current[0], current[1]-1, "W"]); break;
          case "W": pending.push([current[0]+1, current[1], "S"]); break;
          case "N": pending.push([current[0], current[1]+1, "E"]); break;
        }
        break;

      case "-":
        switch(current[2]) {
          case "E": pending.push([current[0], current[1]+1, current[2]]); break;
          case "S":
            pending.push([current[0], current[1]+1, "E"]);
            pending.push([current[0], current[1]-1, "W"]);
            break;
          case "W": pending.push([current[0], current[1]-1, current[2]]); break;
          case "N":
            pending.push([current[0], current[1]-1, "W"]);
            pending.push([current[0], current[1]+1, "E"]);
            break;
        }
        break;

      case "|":
        switch(current[2]) {
          case "E":
            pending.push([current[0]+1, current[1], "S"]);
            pending.push([current[0]-1, current[1], "N"]);
            break;
          case "S": pending.push([current[0]+1, current[1], current[2]]); break;
          case "W":
            pending.push([current[0]-1, current[1], "N"]);
            pending.push([current[0]+1, current[1], "S"]);
            break;
          case "N": pending.push([current[0]-1, current[1], current[2]]); break;
        }
        break;
    }
    processed.push(current);
  }

  return result;
}

var best = -1;
var map = input.split("\n").map(l => l.split(""));

for(var i=0; i<map.length; i++) {
  var temp = calculate(i, 0, "E");
  if(temp>best) {
    best = temp;
  }
  var temp = calculate(i, map[0].length-1, "W");
  if(temp>best) {
    best = temp;
  }
}


for(var j=0; j<map[0].length; j++) {
  var temp = calculate(0, j, "S");
  if(temp>best) {
    best = temp;
  }
  var temp = calculate(map[0].length-1, j, "N");
  if(temp>best) {
    best = temp;
  }
}


log(`result: ${best}`);
