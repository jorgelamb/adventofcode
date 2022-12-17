var jets = input.split("");

var pieces = [
  ["####"],

  [".#.",
   "###",
   ".#."],

  ["..#",
   "..#",
   "###"].reverse(),

  ["#",
   "#",
   "#",
   "#"],

  ["##",
   "##"]
];

var map = [];

var maxHeight = -1;
var currentJetPosition = 0;

function newX(pieceX, pieceY, jet) {
  var direction = jet=="<" ? -1 : 1;
  
  if(pieceX+direction<0) {
    return pieceX;
  }
  if(pieceX+direction+piece[0].length>7) {
    return pieceX;
  }
  for(var r=0; r<piece.length; r++) {
    if(pieceY+r>maxHeight) {
      continue;
    }
    for(var c=0; c<piece[r].length; c++) {
      if(piece[r].charAt(c)=="#") {
        if(map[pieceY+r].charAt(pieceX+direction+c)=="#") {
          return pieceX;
        }
      }
    }
  }
  return pieceX+direction;
}

function canDrop(pieceX, pieceY) {
  if(pieceY==0) {
    return false;
  }
  for(var r=0; r<piece.length; r++) {
    if(pieceY-1+r>maxHeight) {
      continue;
    }
    for(var c=0; c<piece[r].length; c++) {
      if(piece[r].charAt(c)=="#") {
        if(map[pieceY-1+r].charAt(pieceX+c)=="#") {
          return false;
        }
      }
    }
  }
  return true;
}

for(var p=0; p<2022; p++) {
  //log(`loop start ${maxHeight}`);
  var piece = pieces[p%pieces.length];
  var pieceX = 2;
  var pieceY = maxHeight+4;

  //log(`before falling ${pieceX}, ${pieceY}`);
  var falling = true;
  while(falling) {
    falling = false;
    var jet = jets[currentJetPosition];
    currentJetPosition = (currentJetPosition+1)%jets.length;

    pieceX = newX(pieceX, pieceY, jet);
    //log(`after jet ${pieceX}, ${pieceY} ${jet} ${currentJetPositon} ${jets.length}`);

    if(canDrop(pieceX, pieceY)) {
      pieceY--;
      falling = true;
    }
    //log(`falling ${pieceX}, ${pieceY}`);
  }
  //log(`stopped ${pieceX}, ${pieceY}`);

  for(var r=0; r<piece.length; r++) {
    var rowContents = (map[pieceY+r] || "       ").split("");
    for(var c=0; c<piece[r].length; c++) {
      if(piece[r].charAt(c)=="#") {
        rowContents[pieceX+c]="#";
      }
    }
    map[pieceY+r]=rowContents.join("");
  }
  maxHeight = Math.max(maxHeight, pieceY+piece.length-1);
  //log(map.concat([]).reverse().join("\n"));
}

log(`result: ${maxHeight+1}`);
