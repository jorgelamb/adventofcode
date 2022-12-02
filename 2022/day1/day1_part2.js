var blocks = input.split("\n\n");

var sums = blocks.map(block => {
  return block.split("\n").map(s => parseInt(s)).reduce((a, b) => a+b);
})

var sortedSums = sums.sort((a, b) => a-b);
var result = sums.pop()+sums.pop()+sums.pop();

log(`result: ${result}`);
