var lines = input.split("\n");

function getDigitValue(c) {
  switch(c) {
    case "0": return 0;
    case "1": return 1;
    case "2": return 2;
    case "-": return -1;
    case "=": return -2;
  }
}

var result = 0;
lines.forEach(l => {
  var digits = l.split("");
  var value = 0;
  for(var i=0; i<digits.length; i++) {
    value = value*5;
    value += getDigitValue(digits[i]);
  }
  result += value;
});

var resultDigits = [];
while(result>0) {
  switch((result)%5) {
    case 0: resultDigits.push("0"); break;
    case 1: resultDigits.push("1"); break;
    case 2: resultDigits.push("2"); break;
    case 3: resultDigits.push("="); result+=5; break;
    case 4: resultDigits.push("-"); result+=5; break;
  }
  result = Math.floor(result/5);
}

log(`result: ${resultDigits.reverse().join("")}`);
