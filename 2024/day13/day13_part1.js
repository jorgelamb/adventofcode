var blocks = input.split("\n\n");

var result = 0;
blocks.forEach(block => {
  var lines = block.split("\n");
  var a = [...lines[0].matchAll("[0-9]+")].map(e => e[0]-0);
  var b = [...lines[1].matchAll("[0-9]+")].map(e => e[0]-0);
  var prize = [...lines[2].matchAll("[0-9]+")].map(e => e[0]-0);
  
  var optimalB = Math.floor(Math.min(prize[0] / b[0], prize[1] / b[1]));
  for(var nB = optimalB; nB >= 0; nB--) {
    var nA = (prize[0] - nB*b[0]) / a[0];
    if(prize[0] == nB*b[0] + nA*a[0] && prize[1] == nB*b[1] + nA*a[1]) {
      result += 3*nA + nB;
      return;
    }
  }
  return;
});

log(`result: ${result}`);
