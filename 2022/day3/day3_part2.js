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
while(lines.length>0) {
  var block = lines.splice(0, 3);
  var packs = block.map(l => l.split(""));
  for(var i=0; i<packs[0].length; i++) {
    var found1 = false;
    for(var j=0; j<packs[1].length; j++) {
      if(packs[0][i]==packs[1][j]) {
        found1=true;
        break;
      }
    }
    var found2 = false;
    for(var j=0; j<packs[2].length; j++) {
      if(packs[0][i]==packs[2][j]) {
        found2=true;
        break;
      }
    }
    if(found1 && found2) {
      result += getPriority(packs[0][i]);
      break;
    }
  }
};

log(`result: ${result}`);
