function compare(e1, e2) {
  if(typeof e1 == 'object' && typeof e2 == 'object') {
    for(var i=0; i<e1.length && i<e2.length; i++) {
      var compareResult = compare(e1[i], e2[i]);
      if(compareResult != 0) {
        return compareResult;
      }
    }
    if(e1.length < e2.length) {
      return -1;
    } else if(e1.length > e2.length) {
      return 1;
    } else {
      return 0;
    }
  } else if(typeof e1 == 'object' && typeof e2 == 'number') {
    return compare(e1, [e2]);
  } else if(typeof e1 == 'number' && typeof e2 == 'object') {
    return compare([e1], e2);
  } else if(typeof e1 == 'number' && typeof e2 == 'number') {
    if(e1 < e2) {
      return -1;
    } else if(e1 > e2) {
      return 1;
    } else {
      return 0;
    }
  }
}

var blocks = input.split("\n\n");
var indexes = blocks.map((block, idx) => {
  var lines = block.split("\n").map(l => eval(l));
  log(lines[0]);
  log(lines[1]);
  log(compare(lines[0], lines[1]));
  if(compare(lines[0], lines[1]) <= 0) {
    return idx+1;
  } else {
    return 0;
  }
});

var result = indexes.reduce((a, b) => a+b, 0);
log(`result: ${result}`);
