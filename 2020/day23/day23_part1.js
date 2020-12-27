var cups = input.split("").map(v => parseInt(v));
var totalCups = cups.length;

for(var i=0; i<100; i++) {
  var currentCup = cups[0];
  var pickedUp = cups.splice(1, 3);

  var destination = currentCup - 1;
  var destinationIdx = -1;
  if(destination <= 0) { destination = totalCups; }
  while(destinationIdx<0) {
    if(cups.indexOf(destination) >= 0) {
      destinationIdx = cups.indexOf(destination);
    } else {
      destination = destination - 1;
      if(destination <= 0) { destination = totalCups; }
    }
  }

  var cupsAfterDestination = cups.splice(destinationIdx+1);
  var firstCup = cups.splice(0, 1);
  var cups = cups.concat(pickedUp).concat(cupsAfterDestination).concat(firstCup);
}

var firstCupIdx = cups.indexOf(1);
var firstCupAndNext = cups.splice(firstCupIdx);
var cups = firstCupAndNext.concat(cups);
log(cups.join("").substring(1));
