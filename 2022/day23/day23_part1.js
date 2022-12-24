const N = 0;
const S = 1;
const W = 2;
const E = 3;
const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const positionsToConsider = [
  [ [-1, 0], [-1, 1], [-1, -1] ],
  [ [1, 0], [1, 1], [1, -1] ],
  [ [0, -1], [1, -1], [-1, -1] ],
  [ [0, 1], [1, 1], [-1, 1] ]
];

var map = input.split("\n");

var elfs = [];

map.forEach((l, row) => {
  elfs = elfs.concat(l.split("").map((c, column) => [row, column, c]).filter(e => e[2]=="#").map(e => `${e[0]}_${e[1]}`));
});

function logElfs(elfs) {
  var ys = elfs.map(elf => parseInt(elf.split("_")[0])).sort((a, b) => a-b);
  var minRow = ys[0];
  var maxRow = ys[ys.length-1];
  var xs = elfs.map(elf => parseInt(elf.split("_")[1])).sort((a, b) => a-b);
  var minColumn = xs[0];
  var maxColumn = xs[xs.length-1];

  var map=[];
  for(var y=minRow; y<=maxRow; y++) {
    var l = "";
    for(var x=minColumn; x<=maxColumn; x++) {
      if(elfs.indexOf(`${y}_${x}`)>=0) {
        l+="#";
      } else {
        l+=" ";
      }
    }
    map.push(l);
  }
  log(map.join("\n"));
  log("");
}

//logElfs(elfs);
var direction = N;

for(var round=0; round<10; round++) {
  var consideredMoves = {};
  
  elfs.forEach(elf => {
    var row = parseInt(elf.split("_")[0]);
    var column = parseInt(elf.split("_")[1]);
    
    var countNeighbours = 0;
    var empty = 0;
    for(var i=-1; i<=1; i++) {
      for(var j=-1; j<=1; j++) {
        if(i!=0 || j!=0) {
          if(elfs.indexOf(`${row+i}_${column+j}`)>=0) {
            countNeighbours++;
          } else {
            empty++;
          }
        }
      }
    }
    if(empty==8) {
      return;
    }
    
    var proposedMove = false;
    for(var i=0; i<4; i++) {
      var consideringDirection = (direction+i)%4;
      
      var count = 0;
      positionsToConsider[consideringDirection].forEach(p => {
        var newPosition = `${row+p[0]}_${column+p[1]}`;
        if(elfs.indexOf(newPosition)>=0) {
          count++;
        }
      });
      if(count == 0) {
        var newPosition = `${row+directions[consideringDirection][0]}_${column+directions[consideringDirection][1]}`;
        consideredMoves[newPosition] = consideredMoves[newPosition] || [];
        consideredMoves[newPosition].push(elf);
        break;
      }
    }
  });

  Object.entries(consideredMoves).filter(move => move[1].length==1).forEach(move => {
    elfs.splice(elfs.indexOf(move[1][0]), 1);
    elfs.push(move[0]);
  });

  //logElfs(elfs);

  direction = (direction+1)%4;
}

var ys = elfs.map(elf => parseInt(elf.split("_")[0])).sort((a, b) => a-b);
var minRow = ys[0];
var maxRow = ys[ys.length-1];
var xs = elfs.map(elf => parseInt(elf.split("_")[1])).sort((a, b) => a-b);
var minColumn = xs[0];
var maxColumn = xs[xs.length-1];

log(`${minRow} ${maxRow} ${minColumn} ${maxColumn}`);

var result = (maxRow-minRow+1) * (maxColumn-minColumn+1) - elfs.length;
log(`result: ${result}`);
