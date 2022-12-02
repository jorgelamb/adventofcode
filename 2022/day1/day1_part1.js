var blocks = input.split("\n\n");

var sums = blocks.map(block => {
  return block.split("\n").map(s => parseInt(s)).reduce((a, b) => a+b);
})

var result = sums.sort((a, b) => a-b).pop();
log(`result: ${result}`);
