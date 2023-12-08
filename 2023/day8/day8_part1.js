var lines = input.split("\n");

var instructions = lines[0].split("");
var map = {};

input.split("\n\n")[1].split("\n").forEach(l => {
  var origin = l.substring(0, 3);
  var left = l.substring(7, 10);
  var right = l.substring(12, 15);
  map[origin] = {L: left, R: right};
});

var searching = true;
var current = "AAA";
var count = 0;
while(searching) {
  for(var i=0; i<instructions.length && searching; i++) {
    count++;
    current = map[current][instructions[i]];
    if(current=="ZZZ") {
      searching = false;
    }
  }
}

var result = count;
log(`result: ${result}`);
