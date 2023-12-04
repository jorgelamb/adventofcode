var lines = input.split("\n");

var copies = Array(lines.length).fill(1);

lines.forEach((l, idx) => {
  var parts = l.split(":")[1].split("\|");
  var winning = parts[0].trim().split(" ").filter(s => s.length>0);
  var numbers = parts[1].trim().split(" ").filter(s => s.length>0);
  var count = 0;
  numbers.forEach(n => {
    if(winning.indexOf(n)>=0) {
      count++;
    }
  });
  if(count>0) {
    for(var i=0; i<count; i++) {
      copies[idx+i+1] += copies[idx];
    }
  }
});
var result = copies.reduce((a, b) => a+b, 0);
log(`result: ${result}`);
