var lines = input.split("\n");

var result = 0;

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
    result += Math.pow(2, count-1);
  }
});
log(`result: ${result}`);
