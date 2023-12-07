var blocks = input.split("\n\n");

var originalSeeds = blocks[0].split(" ");
originalSeeds.splice(0, 1);

// Remove seeds
blocks.splice(0, 1);


function mapping(element, block) {
  var lines = block.split("\n");
  for(var i=1; i<lines.length; i++) {
    var ranges = lines[i].split(" ");
    var destinationRangeStart = parseInt(ranges[0]);
    var sourceRangeStart = parseInt(ranges[1]);
    var rangeLength = parseInt(ranges[2]);
    if(element>=sourceRangeStart && element<sourceRangeStart+rangeLength) {
      return element - sourceRangeStart + destinationRangeStart;
    }
  }
  return element;
}

var mappings = originalSeeds.map(seed => {
  var currentElement = parseInt(seed);
  for(var b=0; b<blocks.length; b++) {
    block = blocks[b];
    var currentElement = mapping(currentElement, block);
  }
  return currentElement;
});

log(mappings);

var result = mappings.sort((a, b) => a-b)[0];
log(`result: ${result}`);
