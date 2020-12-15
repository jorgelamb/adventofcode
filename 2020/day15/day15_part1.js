var starting = input.split(",");
var numbers = {};

var turn = 0;
var nextNumber = 0;
for(var i=0; i<starting.length; i++) {
  var current = parseInt(starting[i]);
  if(numbers[current]!=undefined) {
    nextNumber = i - numbers[current];
  } else {
    nextNumber = 0;
  }
  numbers[current] = turn++;
}
while(turn<2019) {
  var current = nextNumber;
  if(numbers[current]!=undefined) {
    nextNumber = turn - numbers[current];
  } else {
    nextNumber = 0;
  }
  numbers[current] = turn++;
}

log("result: "+nextNumber);
