var lines = input.split("\n");

function safe(levels, idx, canRemove) {
  var direction = levels[1]>levels[0] ? 1 : -1;
  for(var i=1; i<levels.length; i++) {
    if(direction>0 && (levels[i]<=levels[i-1] || levels[i]>levels[i-1]+3)) {
      if(canRemove) {
        var copy1 = [...levels];
        copy1.splice(i-1, 1);
        var copy2 = [...levels];
        copy2.splice(i, 1);
        var copySpecial = [...levels];
        copySpecial.splice(0, 1);
        var s = safe(copy1, idx, false) || safe(copy2, idx, false) || safe(copySpecial, idx, false);

        if(s>0) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    } else if(direction<0 && (levels[i]>=levels[i-1] || levels[i]<levels[i-1]-3)) {
      if(canRemove) {
        var copy1 = [...levels];
        copy1.splice(i-1, 1);
        var copy2 = [...levels];
        copy2.splice(i, 1);
        var copySpecial = [...levels];
        copySpecial.splice(0, 1);
        var s = safe(copy1, idx, false) || safe(copy2, idx, false) || safe(copySpecial, idx, false);
        
        if(s>0) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    }
  }
  return 1;
}

var result = lines.map((l, idx) => {
  var levels = l.split(" ").map(n => n-0);
  if(safe(levels, idx, true)) {
    return 1;
  } else {
    return 0;
  }
}).reduce((a, b) => a+b, 0);

log(`result: ${result}`);
