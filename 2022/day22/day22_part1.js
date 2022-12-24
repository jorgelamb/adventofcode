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
  if(direction==0 || direction==2) {
    x = realMod(x + directions[direction][1], Math.min(WIDTH, map[y].length));
  } else {
    y = realMod(y + directions[direction][0], HEIGHT);
  }
  while(map[y].length<x || map[y][x]==" ") {
    if(direction==0 || direction==2) {
      x = realMod(x + directions[direction][1], Math.min(WIDTH, map[y].length));
    } else {
      y = realMod(y + directions[direction][0], HEIGHT);
    }
  }
  return { row: y, column: x };
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
      } else {
        break;
      }
    }
  }
});

var result = 1000*(y+1)+4*(x+1)+direction;
log(`result: ${result}`);
