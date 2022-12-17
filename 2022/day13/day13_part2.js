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


var lines = input.split("\n").filter(l => l.length>0).map(l => eval(l));
lines.push([[2]]);
lines.push([[6]]);

lines = lines.sort((e1, e2) => compare(e1, e2));
var idx1 = lines.findIndex(e => { try { if(e[0][0]!=2) { return false; } if(e.length!=1 || e[0].length!=1) { return false; } return true; } catch(e) {return false} })+1;
var idx2 = lines.findIndex(e => { try { if(e[0][0]!=6) { return false; } if(e.length!=1 || e[0].length!=1) { return false; } return true; } catch(e) {return false} })+1;
log(`result: ${idx1 * idx2}`);
