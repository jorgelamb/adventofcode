var lines = input.split("\n");

var chars = lines[0].split("");
for(var i=0; i<chars.length; i++) {
  var fragment = chars.slice(i, i+14);
  fragment.sort();
  var found = true;
  for(var c=1; c<14; c++) {
    if(fragment[c-1]==fragment[c]) {
      found = false;
      break;
    }
  }
  if(found) {
    log(i+14);
    exit();
  }
}


var result = "";
log(`result: ${result}`);
