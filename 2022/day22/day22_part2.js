const E = 0;
const S = 1;
const W = 2;
const N = 3;
const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

var blocks = input.split("\n\n");

var map = blocks[0].split("\n").map(l => l.split(""));
var instructions = [...blocks[1].matchAll(/(R|L|\d+)/g)].map(e => e[0]);

var WIDTH = map[0].length;
var HEIGHT = map.length;

var x = 0;
var y = 0;
var direction = E;

for(var i=0; i<map[0].length; i++) {
  if(map[0][i]==".") {
    x = i;
    break;
  }
}

function realMod(x, mod) {
  var temp = x%mod;
  if(temp<0) {
    temp += mod;
  }
  return temp;
}

function getNextPosition(x, y, direction) {
  switch(direction) {
    case E:
      if(x==149 && y<50) {
        log(`from ${x} ${y} direction ${"ESWN".charAt(direction)}`);
        x = 99;
        y = 149-y;
        direction = W;
        log(`to ${x} ${y} direction ${"ESWN".charAt(direction)}`);
      } else if(x==99 && 50<=y && y<100) {
        log(`from ${x} ${y} direction ${"ESWN".charAt(direction)}`);
        x = 100 + (y-50);
        y = 49;
        direction = N;
        log(`to ${x} ${y} direction ${"ESWN".charAt(direction)}`);
      } else if(x==99 && 100<=y && y<150) {
        log(`from ${x} ${y} direction ${"ESWN".charAt(direction)}`);
        x = 149;
        y = 49 - (y-100);
        direction = W;
        log(`to ${x} ${y} direction ${"ESWN".charAt(direction)}`);
      } else if(x==49 && 150<=y) {
        log(`from ${x} ${y} direction ${"ESWN".charAt(direction)}`);
        x = 50 + (y-150);
        y = 149;
        direction = N;
        log(`to ${x} ${y} direction ${"ESWN".charAt(direction)}`);
      } else {
        x += directions[direction][1];
        y += directions[direction][0];
      }
      break;
    case W:
      if(x==50 && y<50) {
        log(`from ${x} ${y} direction ${"ESWN".charAt(direction)}`);
        x = 0;
        y = 149-y;
        direction = E;
        log(`to ${x} ${y} direction ${"ESWN".charAt(direction)}`);
      } else if(x==50 && 50<=y && y<100) {
        log(`from ${x} ${y} direction ${"ESWN".charAt(direction)}`);
        x = 0 + (y-50);
        y = 100;
        direction = S;
        log(`to ${x} ${y} direction ${"ESWN".charAt(direction)}`);
      } else if(x==0 && 100<=y && y<150) {
        log(`from ${x} ${y} direction ${"ESWN".charAt(direction)}`);
        x = 50;
        y = 49 - (y-100);
        direction = E;
        log(`to ${x} ${y} direction ${"ESWN".charAt(direction)}`);
      } else if(x==0 && 150<=y) {
        log(`from ${x} ${y} direction ${"ESWN".charAt(direction)}`);
        x = 50 + (y-150);
        y = 0;
        direction = S;
        log(`to ${x} ${y} direction ${"ESWN".charAt(direction)}`);
      } else {
        x += directions[direction][1];
        y += directions[direction][0];
      }
      break;
    case N:
      if(x<50 && y==100) {
        log(`from ${x} ${y} direction ${"ESWN".charAt(direction)}`);
        y = 50 + x;
        x = 50;
        direction = E;
        log(`to ${x} ${y} direction ${"ESWN".charAt(direction)}`);
      } else if(50<=x && x<100 && y==0) {
        log(`from ${x} ${y} direction ${"ESWN".charAt(direction)}`);
        y = 150 + (x-50);
        x = 0;
        direction = E;
        log(`to ${x} ${y} direction ${"ESWN".charAt(direction)}`);
      } else if(100<=x && x<150 && y==0) {
        log(`from ${x} ${y} direction ${"ESWN".charAt(direction)}`);
        x = 0 + (x-100);
        y = 199;
        direction = N;
        log(`to ${x} ${y} direction ${"ESWN".charAt(direction)}`);
      } else {
        x += directions[direction][1];
        y += directions[direction][0];
      }
      break;
    case S:
      if(x<50 && y==199) {
        log(`from ${x} ${y} direction ${"ESWN".charAt(direction)}`);
        x = 100 + x;
        y = 0;
        direction = S;
        log(`to ${x} ${y} direction ${"ESWN".charAt(direction)}`);
      } else if(50<=x && x<100 && y==149) {
        log(`from ${x} ${y} direction ${"ESWN".charAt(direction)}`);
        y = 150 + (x-50);
        x = 49;
        direction = W;
        log(`to ${x} ${y} direction ${"ESWN".charAt(direction)}`);
      } else if(100<=x && x<150 && y==49) {
        log(`from ${x} ${y} direction ${"ESWN".charAt(direction)}`);
        y = 50 + (x-100);
        x = 99;
        direction = W;
        log(`to ${x} ${y} direction ${"ESWN".charAt(direction)}`);
      } else {
        x += directions[direction][1];
        y += directions[direction][0];
      }
      break;
  }
  return { row: y, column: x, direction: direction };
}

function isFree(position) {
  if(position.column >= map[position.row].length) {
    return false;
  }
  return map[position.row][position.column] == ".";
}


instructions.forEach(instruction => {
  if(instruction == "L") {
    direction = (direction+3)%4;
  } else if(instruction == "R") {
    direction = (direction+1)%4;
  } else {
    var n = parseInt(instruction);
    for(var step=0; step<n; step++) {
      var newPosition = getNextPosition(x, y, direction);
      if(isFree(newPosition)) {
        x = newPosition.column;
        y = newPosition.row;
        direction = newPosition.direction;
      } else {
        break;
      }
    }
  }
});

var result = 1000*(y+1)+4*(x+1)+direction;
log(`result: ${result}`);
