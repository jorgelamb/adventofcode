//debugger;

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
tiles[0].x = 0;
tiles[0].y = 0;

var minX = 0;
var maxX = 0;
var minY = 0;
var maxY = 0;

//debugger;

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

var total = 1;
total *= map[minX+"_"+minY].id;
total *= map[minX+"_"+maxY].id;
total *= map[maxX+"_"+minY].id;
total *= map[maxX+"_"+maxY].id;

log("result: "+total);

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

function reverse(str) {
  return str.split("").reverse().join("");
}
