var lines = input.split("\n").join("~");

var matches = [...lines.matchAll(/mul\(([0-9]+)\,([0-9]+)\)/g)];//\(([0-9]{1-3}),([0-9]{1-3})\)/g)];
log(matches);
var result = 0;
for(var i=0; i<matches.length; i++) {
  result += matches[i][1]*matches[i][2];
 }
log(`result: ${result}`);
