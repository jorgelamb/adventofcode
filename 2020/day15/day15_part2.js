var input = "2,15,0,9,1,20";
var starting = input.split(",");
var numbers = [];

var turn = 0;
var nextNumber = 0;
for(var i=0; i<starting.length; i++) {
  var current = parseInt(starting[i]);
//console.log("Current: "+current+" -> "+numbers[current]);
  if(numbers[current]!=undefined) {
    nextNumber = i - numbers[current];
  } else {
    nextNumber = 0;
  }
//console.log(current);
  numbers[current] = turn++;
}
while(turn<30000000-1) {
  if(turn%1000000 == 0) { console.log(turn); }
  var current = nextNumber;
//console.log("Current: "+current+" -> "+numbers[current]);
  if(numbers[current]!=undefined) {
    nextNumber = turn - numbers[current];
  } else {
    nextNumber = 0;
  }
//console.log(current);
  numbers[current] = turn++;
}

console.log("result: "+nextNumber);
