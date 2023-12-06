var lines = input.split("\n");

var times = lines[0].split(" ").filter(t => t.length>0);
times.shift();
times = [times.join("")];
var distances = lines[1].split(" ").filter(t => t.length>0);
distances.shift();
distances = [distances.join("")];

var result = 1;
for(var i=0; i<times.length; i++) {
  var count = 0;
  for(var j=1; j<times[i]; j++) {
    if(j*(times[i]-j)>distances[i]) {
      count++;
    }
  }
  result*=count;
}

log(`result: ${result}`);
