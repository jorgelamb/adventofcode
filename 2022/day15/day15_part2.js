var lines = input.split("\n");

const ROW_LIMIT = (test ? 20 : 4000000);

for(var ROW=0; ROW<=4000000; ROW++) {
  
  var beacons = lines.map(l => {
    var ints = [...l.matchAll(/[^-\d]+(-?\d+)[^-\d]+(-?\d+)[^-\d]+(-?\d+)[^-\d]+(-?\d+)/g)][0];
    ints.shift();
    return ints.map(i => parseInt(i));
  });

  var coverage = beacons.map(b => {
    var distance = Math.abs(b[0]-b[2])+Math.abs(b[1]-b[3]);
    if(distance>=Math.abs(b[1]-ROW)) {
      return [b[0]-(distance-Math.abs(b[1]-ROW)), b[0]+(distance-Math.abs(b[1]-ROW))];
    } else {
      return [];
    }
  });

  coverage = coverage.filter(c => c.length>0);
  coverage = coverage.filter(c => c[1]>=0);
  coverage = coverage.filter(c => c[0]<=ROW_LIMIT);
  coverage = coverage.map(c => [Math.max(c[0], 0), Math.min(c[1], ROW_LIMIT)]);
  coverage = coverage.sort((a, b) => a[0]-b[0]);
  
  var result = 0;
  var min = coverage[0][0]-1;
  coverage.forEach(c => {
    if(c[0]>min) {
      result += c[1]-c[0]+1;
      min = c[1];
    } else if(c[1]>min) {
      result += c[1]-min;
      min = c[1];
    }
  });
  if(result<ROW_LIMIT+1) {
    for(var x=0; x<=ROW_LIMIT; x++) {
      var found = false;
      coverage.forEach(c => {
        if(c[0]<=x && x<=c[1]) {
          found = true;
        }
      });
      if(!found) {
        log(`${x}, ${ROW} => ${x*4000000+ROW}`);
      }
    }
    break;
  }
}

