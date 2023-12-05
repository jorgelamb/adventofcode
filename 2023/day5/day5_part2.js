var blocks = input.split("\n\n");

var originalSeeds = blocks.shift().split(" ");
originalSeeds.shift();
originalSeeds = originalSeeds.map(n => parseInt(n));

var blockMappings = blocks.map(block => { var blockLines = block.split("\n"); blockLines.shift(); return blockLines.map(l => l.split(" ").map(n => parseInt(n))); });

var count = 0;
function findBest(mappings, depth, rangeStart, rangeEnd) {
  if(depth>=mappings.length) {
    return rangeStart;
  }
  var mapping = mappings[depth];
  for(var m=0; m<mapping.length; m++) {
    var destinationStart = mapping[m][0];
    var originStart = mapping[m][1];
    var length = mapping[m][2];
    if(rangeStart>=originStart+length) {
      continue;
    } else if(rangeEnd<originStart) {
      continue;
    } else if(rangeStart>=originStart && rangeEnd<originStart+length) {
      return findBest(mappings, depth+1, rangeStart-originStart+destinationStart, rangeEnd-originStart+destinationStart);
    } else if(rangeStart<originStart) {
      var a = findBest(mappings, depth, rangeStart, originStart-1);
      var b = findBest(mappings, depth, originStart, rangeEnd);
      return Math.min(a, b);
    } else {
      var a = findBest(mappings, depth, rangeStart, originStart+length-1);
      var b = findBest(mappings, depth, originStart+length, rangeEnd);
      return Math.min(a, b);
    }
  }
  return findBest(mappings, depth+1, rangeStart, rangeEnd);
}

var best = -1;
for(var seedIdx=0; seedIdx<originalSeeds.length; seedIdx+=2) {
  var current = findBest(blockMappings, 0, originalSeeds[seedIdx], originalSeeds[seedIdx]+originalSeeds[seedIdx+1]-1);
  if(current < best || best == -1) {
    best = current;
  }
}

var result = best;
log(`result: ${result}`);
