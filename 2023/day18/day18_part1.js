var lines = input.split("\n");

var position = [0, 0];
var minX = position[0];
var maxX = position[0];

var prev = lines[lines.length-1].split(" ")[0];
var dug = [ [position[0], position[1], prev] ];

lines.forEach(l => {
  var parts = l.split(" ");
  switch(parts[0]) {
    case "R":
      for(var i=0; i<parseInt(parts[1]); i++) {
        dug[dug.length-1].push(parts[0]);
        position[1]++;
        dug.push([position[0], position[1], parts[0]]);
        minX = Math.min(minX, position[1]);
        maxX = Math.max(maxX, position[1]);
        prev = parts[0];
      }
      break;
    case "L":
      for(var i=0; i<parseInt(parts[1]); i++) {
        dug[dug.length-1].push(parts[0]);
        position[1]--;
        dug.push([position[0], position[1], parts[0]]);
        minX = Math.min(minX, position[1]);
        maxX = Math.max(maxX, position[1]);
        prev = parts[0];
      }
      break;
    case "D":
      for(var i=0; i<parseInt(parts[1]); i++) {
        dug[dug.length-1].push(parts[0]);
        position[0]++;
        dug.push([position[0], position[1], parts[0]]);
        minX = Math.min(minX, position[1]);
        maxX = Math.max(maxX, position[1]);
        prev = parts[0];
      }
      break;
    case "U":
      for(var i=0; i<parseInt(parts[1]); i++) {
        dug[dug.length-1].push(parts[0]);
        position[0]--;
        dug.push([position[0], position[1], parts[0]]);
        minX = Math.min(minX, position[1]);
        maxX = Math.max(maxX, position[1]);
        prev = parts[0];
      }
      break;
  }
});

dug.pop();


var result = 0;
for(var i=minX; i<=maxX; i++) {
  var count = 0;
  var filtered = dug.filter(e => e[1]==i);
  var sorted = filtered.sort((a, b) => a[0]-b[0]);
  if(sorted.length>0) {
    var inside=false;
    var min=sorted[0][0];
    for(var s=0; s<sorted.length; s++) {
      var current = sorted[s];
      var isCross = ( (current[2]=="R" || current[3]=="L") );
      if(inside) {
        if(isCross) {
          count+=current[0]-min+1;
          inside=false;
        }
      } else {
        if(isCross) {
          min=current[0];
          inside=true;
        } else {
          count++;
        }
      }
    }
  }
  result += count;
}

log(`result: ${result}`);
