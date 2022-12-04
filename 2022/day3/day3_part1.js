var lines = input.split("\n");

const CHAR_CODE_A = "A".charCodeAt(0);
const CHAR_CODE_a = "a".charCodeAt(0);

function getPriority(c) {
  var charCode = c.charCodeAt(0);
  if(charCode-CHAR_CODE_A < 26) {
    //log(charCode-CHAR_CODE_A+1);
    return charCode-CHAR_CODE_A+27;
  } else {
    //log(charCode-CHAR_CODE_a+1);
    return charCode-CHAR_CODE_a+1;
  }
}

var result = 0;
lines.forEach(l => {
  var elements = l.split("");
  var left = elements.splice(0, l.length/2);
  for(var i=0; i<left.length; i++) {
    if(left.indexOf(left[i])!=i) {
      continue;
    }
    for(var j=0; j<elements.length; j++) {
      if(left[i]==elements[j]) {
        result += getPriority(left[i]);
        break;
      }
    }
  }
});

log(`result: ${result}`);
