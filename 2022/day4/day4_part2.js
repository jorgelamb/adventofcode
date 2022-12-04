var lines = input.split("\n");

var result = 0;
lines.forEach(l => {
  var ranges = l.split(",").map(elf => elf.split("-").map(e => parseInt(e)));
  if(ranges[0][0]<=ranges[1][0] && ranges[0][1]>=ranges[1][0]
     ||
     ranges[0][0]<=ranges[1][1] && ranges[0][1]>=ranges[1][1]
     ||
     ranges[0][0]>=ranges[1][0] && ranges[0][1]<=ranges[1][1]
    ) {
    result++;
  }
});

log(`result: ${result}`);
