var tilesInput = input.split("\n\n");

var tiles = tilesInput.map(tInput => {
  var lines = tInput.split("\n");
  var id = lines[0].split(" ")[1].split(":")[0];
  lines.splice(0, 1);

  var right = "";
  var left = "";
  for(var i=0; i<lines.length; i++) {
    right += lines[i].charAt(lines[i].length-1);
    left += lines[lines.length-1-i].charAt(0);
  }

  return { id: id, lines: lines, left: left, right: right };
});

var map = {};
map["0_0"] = tiles[0];
tiles[0].added = true;
tiles[0].rotation = 0;
tiles[0].flipped = 0;
tiles[0].x = 0;
tiles[0].y = 0;

var minX = 0;
var maxX = 0;
var minY = 0;
var maxY = 0;

var added = true;
while(added) {
  added = false;

  for(var i=0; i<tiles.length; i++) {
    var aTile = tiles[i];
    if(aTile.added) { continue }

    for(addedTile in map) {
      var otherTile = map[addedTile];

      var x = 0;
      var y = 0;

      for(var bA=0; bA<4 && !aTile.added; bA++) {
        for(var bO=0; bO<4 && !aTile.added; bO++) {
          for(var flipped=0; flipped<=1 && !aTile.added; flipped++) {
            var borderA = getBorder(aTile, bA, flipped);
            var borderB = getBorder(otherTile, bO, false);
            var match = borderA == reverse(borderB);
            if(match) {
              switch(bO) {
                case 0: x = otherTile.x;   y = otherTile.y+1; break;
                case 1: x = otherTile.x+1; y = otherTile.y;   break;
                case 2: x = otherTile.x;   y = otherTile.y-1; break;
                case 3: x = otherTile.x-1; y = otherTile.y;   break;
              }
              addTile(i, x, y, ((2-bA+bO)+8)%4, flipped);
              added = true;
              break;
            }
          }
        }
      }
    }
  }
}


function addTile(i, x, y, rotation, flipped) {
  map[x+"_"+y] = tiles[i];
  tiles[i].added = true;
  tiles[i].rotation = rotation;
  tiles[i].x = x;
  tiles[i].y = y;
  tiles[i].flipped = flipped;

  minX = Math.min(minX, x);
  maxX = Math.max(maxX, x);
  minY = Math.min(minY, y);
  maxY = Math.max(maxY, y);
}

function getBorder(tile, rotation, flipped) {
  var placedRotation = tile.rotation || 0;
  var placedFlipped = tile.flipped || 0;
  if(flipped || placedFlipped) {
    switch((rotation - placedRotation + 4)%4) {
      case 0: return tile.lines[tile.lines.length-1];
      case 1: return reverse(tile.right);
      case 2: return reverse(tile.lines[0]);
      case 3: return reverse(tile.left);
    }
  } else {
    switch((rotation - placedRotation + 4)%4) {
      case 0: return tile.lines[0];
      case 1: return tile.right;
      case 2: return reverse(tile.lines[tile.lines.length-1]);
      case 3: return tile.left;
    }
  }
}

// part 2:

var tileSize = tiles[0].lines.length-2;
var imageWidth = (maxX-minX+1)*tileSize;
var imageHeigth = (maxY-minY+1)*tileSize;

var total = 0;
var seaMonsterMarks = {};
var hashes = 0;

var seaMonster = "                  # \n#    ##    ##    ###\n #  #  #  #  #  #   ";

var seaMonsters = [];
seaMonsters.push(seaMonster.split("\n"));
seaMonsters.push(seaMonster.split("\n").reverse());
seaMonsters.push(seaMonster.split("\n").map(reverse));
seaMonsters.push(seaMonster.split("\n").reverse().map(reverse));

var oneRotation = "";
for(var i=0; i<seaMonsters[0][0].length; i++) {
  if(oneRotation.length > 0) {
    oneRotation += "\n";
  }
  for(var j=0; j<seaMonsters[0].length; j++) {
    oneRotation += seaMonsters[0][j].charAt(i);
  }
}
seaMonsters.push(oneRotation.split("\n"));
seaMonsters.push(oneRotation.split("\n").reverse());
seaMonsters.push(oneRotation.split("\n").map(reverse));
seaMonsters.push(oneRotation.split("\n").reverse().map(reverse));

for(var v=0; v<seaMonsters.length; v++) {
  //for(var i=0; i<=imageWidth-seaMonsters[v][0].length; i++) {
    //for(var j=0; j<=imageHeigth-seaMonsters[v].length; j++) {
  for(var i=0; i<=imageWidth; i++) {
    for(var j=0; j<=imageHeigth; j++) {
try {
      var match = true;
      for(var ii=0; match && ii<seaMonsters[v][0].length; ii++) {
        for(var jj=0; match && jj<seaMonsters[v].length; jj++) {
          if(seaMonsters[v][jj].charAt(ii) == '#') {
            if(getPixel(i+ii, j+jj) != '#') {
              match = false;
            }
          }
        }
      }
      if(match) {
        total++;
        for(var ii=0; match && ii<seaMonsters[v][0].length; ii++) {
          for(var jj=0; match && jj<seaMonsters[v].length; jj++) {
            if(seaMonsters[v][jj].charAt(ii) == '#') {
              markSeaMonster(i+ii, j+jj);
            }
          }
        }
      }
} catch(e) {}
    }
  }
}

function reverse(str) {
  return str.split("").reverse().join("");
}

function getPixel(x, y) {
  var tile = map[(Math.floor(x/tileSize)+minX)+"_"+(Math.floor(y/tileSize)+minY)];
  var offsetX = (x % tileSize)+1;
  var offsetY = (y % tileSize)+1;

  var placedFlipped = tile.flipped || 0;
  if(placedFlipped) {
    switch(tile.rotation) {
      case 0: return tile.lines[offsetY].charAt(offsetX);
      case 1: return tile.lines[offsetX].charAt(tile.lines.length-offsetY-1);
      case 2: return tile.lines[tile.lines.length-offsetY-1].charAt(tile.lines.length-offsetX-1);
      case 3: return tile.lines[tile.lines.length-offsetX-1].charAt(offsetY);
    }
  } else {
    switch(tile.rotation) {
      case 0: return tile.lines[tile.lines.length-offsetY-1].charAt(offsetX);
      case 1: return tile.lines[tile.lines.length-offsetX-1].charAt(tile.lines.length-offsetY-1);
      case 2: return tile.lines[offsetY].charAt(tile.lines.length-offsetX-1);
      case 3: return tile.lines[offsetX].charAt(offsetY);
    }
  }
}

function markSeaMonster(x, y) {
  seaMonsterMarks[x+"_"+y] = true;
}

var s = "";
var t = "";
for(var i=0; i<imageWidth; i++) {
  s += "\n";
  t += "\n";
  for(var j=0; j<imageHeigth; j++) {
    s += getPixel(i, j);
    t += seaMonsterMarks[i+"_"+j] ? 'O' : getPixel(i, j);
    if(getPixel(i, j) == '#') {
      hashes++;
    }
  }
}

log("roughness: "+(hashes-Object.entries(seaMonsterMarks).length));
