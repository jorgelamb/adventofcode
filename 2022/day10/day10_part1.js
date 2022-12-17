var lines = input.split("\n");

var result = 0;
var next = 20;
var current = 0;
value = 1;

for(var i=0; i<lines.length; i++) {
  if(lines[i]=="noop") {
    cycles = 1;
    sum = 0;
  } else {
    cycles = 2;
    sum = parseInt(lines[i].split(" ")[1]);
  }
  if(current+cycles>=next) {
    result += next * value;
    next += 40;
  }
  current+=cycles;
  value+=sum;
}
log(`result: ${result}`);
