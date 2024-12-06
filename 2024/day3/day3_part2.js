var lines = input.split("\n").join("~");

var matches = [...lines.matchAll(/(?:do\(\))|(?:don't\(\))|mul\(([0-9]+)\,([0-9]+)\)/g)];//\(([0-9]{1-3}),([0-9]{1-3})\)/g)];

log(matches);

var result = 0;
var mode = true;

for(var i=0; i<matches.length; i++) {
  if(matches[i][0] == "do()") {
    mode = true;
  } else if(matches[i][0] == "don't()") {
    mode = false;
  } else if(mode) {
    result += matches[i][1]*matches[i][2];
  }

 }

log(`result: ${result}`
