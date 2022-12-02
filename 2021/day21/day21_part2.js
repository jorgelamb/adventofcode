var lines = input.split("\n");

const LIMIT = 21;

var starting = lines.map(s => s.substring(s.lastIndexOf(' ')+1)).map(s => parseInt(s));
var options = new Array(10).fill(0);
for(var a=1; a<=3; a++) {
  for(var b=1; b<=3; b++) {
    for(var c=1; c<=3; c++) {
      options[a+b+c]++;
    }
  }
}

var pending = [];

var mem = [];
for(var points0=0; points0<30; points0++) {
  mem[points0] = [];
  for(var points1=0; points1<30; points1++) {
    mem[points0][points1] = [];
    for(var position0=1; position0<=10; position0++) {
      mem[points0][points1][position0] = [];
      for(var position1=1; position1<=10; position1++) {
        mem[points0][points1][position0][position1] = [];
        for(var turn=0; turn<=1; turn++) {
          mem[points0][points1][position0][position1][turn] = 0;
        }
      }
    }
  }
}
mem[0][0][starting[0]][starting[1]][0] = 1;

pending.push([0, 0, starting[0], starting[1], 0]); // points0, points1, position0, position1, turn
var result = [0, 0];

while(pending.length>0) {
  pending = pending.sort((e1, e2) => (e2[0]+e2[1]) - (e1[0]+e1[1]));
  var current = pending.pop();
//log(current);
  for(o=3; o<options.length; o++) {
    if(options[o]==0) { continue; }
    if(current[4]==0) {
      var newPosition = current[2]+o;
      if(newPosition>10) {
        newPosition -= 10;
      }
      var newPoints = current[0]+newPosition;
      if(newPoints >= LIMIT) {
        result[0] += mem[current[0]][current[1]][current[2]][current[3]][0] * options[o];
      } else {
        mem[current[0]+newPosition][current[1]][newPosition][current[3]][1] += mem[current[0]][current[1]][current[2]][current[3]][0] * options[o];
        if(pending.filter(e => e[0]==current[0]+newPosition && e[1]==current[1] && e[2]==newPosition && e[3]==current[3] && e[4]==1).length==0) {
          pending.push([current[0]+newPosition, current[1], newPosition, current[3], 1]);
        }
      }
    }
    if(current[4]==1) {
      var newPosition = current[3]+o;
      if(newPosition>10) {
        newPosition -= 10;
      }
      var newPoints = current[1]+newPosition;
      if(newPoints >= LIMIT) {
        result[1] += mem[current[0]][current[1]][current[2]][current[3]][1] * options[o];
      } else {
        mem[current[0]][current[1]+newPosition][current[2]][newPosition][0] += mem[current[0]][current[1]][current[2]][current[3]][1] * options[o];
        if(pending.filter(e => e[0]==current[0] && e[1]==current[1]+newPosition && e[2]==current[2] && e[3]==newPosition && e[4]==0).length==0) {
          pending.push([current[0], current[1]+newPosition, current[2], newPosition, 0]);
        }
      }
    }
  }
}

log(`result: ${result}`);
