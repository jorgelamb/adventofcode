var lines = input.split("\n");
const directions = [
  [0, 0, -1],
  [0, 1, 0],
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
];

var result = 0;
lines.forEach(l => {
  var position = l.split(",").map(e => parseInt(e));
  directions.forEach(d => {
    var neighbour = position.map((e, idx) => e+d[idx]).join(",");
    
    if(lines.indexOf(neighbour)<0) {
      result++;
    }
  });
});

log(`result: ${result}`);
