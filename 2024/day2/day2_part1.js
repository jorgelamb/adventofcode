var lines = input.split("\n");

var result = lines.map((l, idx) => {
  var levels = l.split(" ").map(n => n-0);
  var direction = levels[1]>levels[0] ? 1 : -1;
  for(var i=1; i<levels.length; i++) {
    if(direction>0 && (levels[i]<=levels[i-1] || levels[i]>levels[i-1]+3)) {
      return 0;
    } else if(direction<0 && (levels[i]>=levels[i-1] || levels[i]<levels[i-1]-3)) {
      return 0;
    }
  }
  return 1;
}).reduce((a, b) => a+b, 0);

log(`result: ${result}`);
