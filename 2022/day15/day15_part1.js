var lines = input.split("\n");

const ROW = (test ? 10 : 2000000);

var beacons = lines.map(l => {
  var ints = [...l.matchAll(/[^-\d]+(-?\d+)[^-\d]+(-?\d+)[^-\d]+(-?\d+)[^-\d]+(-?\d+)/g)][0];
  ints.shift();
  return ints.map(i => parseInt(i));
});

var coverage = beacons.map(b => {
  var distance = Math.abs(b[0]-b[2])+Math.abs(b[1]-b[3]);
  if(distance>=Math.abs(b[1]-ROW)) {
    if(b[3]==ROW) {
      var c = [b[0]-(distance-Math.abs(b[1]-ROW)), b[0]+(distance-Math.abs(b[1]-ROW))]
      if(b[2]==c[0] && b[2]==c[1]) {
        return [];
      } else if(b[2]==c[0]) {
        return [c[0]+1, c[1]];
      } else if(b[2] == c[1]) {
        return [c[0], c[1]-1];
      } else {
        return c;
      }
    } else {
  	  return [b[0]-(distance-Math.abs(b[1]-ROW)), b[0]+(distance-Math.abs(b[1]-ROW))];
    }
  } else {
  	return [];
  }
});

coverage = coverage.filter(c => c.length>0);
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

log(`result: ${result}`);
