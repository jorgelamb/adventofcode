var input = "137826495";

var providedCups = input.split("").map(v => parseInt(v));

var cups = [...Array(1000000).keys()].map(v => v+1);
for(var i=0; i<providedCups.length; i++) {
  cups[i] = providedCups[i];
}

var totalCups = cups.length;
var initTime = new Date().getTime();
var currentIdx = 0;

for(var i=0; i<10000000; i++) {
  if(i % 10000 == 0) { console.log(i+" "+(new Date().getTime()-initTime)); }
  var currentCup = cups[currentIdx];
  var pickedUp = cups.splice(currentIdx+1, 3);
  if(pickedUp.length < 3) {
    currentIdx -= 3-pickedUp.length;
    pickedUp = pickedUp.concat(cups.splice(0, 3-pickedUp.length));
  }

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

  if(destinationIdx < currentIdx) {
    currentIdx += 3;
  }

  cups.splice(destinationIdx+1, 0, ...pickedUp);
  currentIdx = (currentIdx + 1) % totalCups;
}

var firstCupIdx = cups.indexOf(1);
console.log(cups[(firstCupIdx+1)%totalCups]*cups[(firstCupIdx+2)%totalCups]);
