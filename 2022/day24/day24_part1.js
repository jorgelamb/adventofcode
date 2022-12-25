var lines = input.split("\n");

var map = lines.map(l => l.split(""));

var blizzards = [];
for(var row=1; row<map.length-1; row++) {
  for(var column=1; column<map[0].length-1; column++) {
    switch(map[row][column]) {
      case ">":
      case "<":
      case "^":
      case "v":
        blizzards.push([row, column, map[row][column]]);
        break;
      default:
        break;
    }
  }
}

var WIDTH = map[0].length;
var HEIGHT = map.length;

var start = [0, 1];
var goal = [map.length-1, map[0].length-2];

var pending = [];
var next = [start];

var rounds = 0;
while(next.length>0) {
  pending = next;
  next = [];

  rounds++;
  console.log(`round ${rounds}: pending=${pending.length}`);

  blizzards.forEach(blizzard => {
    switch(blizzard[2]) {
      case ">":
        if(blizzard[1]==WIDTH-2) {
          blizzard[1] = 1;
        } else {
          blizzard[1]++;
        }
        break;
      case "<":
        if(blizzard[1]==1) {
          blizzard[1] = WIDTH-2;
        } else {
          blizzard[1]--;
        }
        break;
      case "v":
        if(blizzard[0]==HEIGHT-2) {
          blizzard[0] = 1;
        } else {
          blizzard[0]++;
        }
        break;
      case "^":
        if(blizzard[0]==1) {
          blizzard[0] = HEIGHT-2;
        } else {
          blizzard[0]--;
        }
        break;
    }
  });

  while(pending.length>0) {
    var current = pending.pop();
    [[0, 1], [0, -1], [1, 0], [-1, 0], [0, 0]].forEach(d => {
      var newRow = current[0]+d[0];
      var newColumn = current[1]+d[1];
      if(newRow == goal[0] && newColumn == goal[1]) {
        log(rounds);
        exit();
      } else if(newRow>=0 && newColumn>=0 && map[newRow][newColumn] != "#") {
        if(blizzards.filter(blizzard => blizzard[0]==newRow && blizzard[1]==newColumn).length == 0) {
          if(next.filter(n => n[0]==newRow && n[1]==newColumn).length == 0) {
            next.push([newRow, newColumn]);
          }
        }
      }
    });
  }
}
log("not found");
