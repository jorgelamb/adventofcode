var fs = require('fs');

function log(o) {
  console.log(JSON.stringify(o));
}

const TEST = false;

const FILENAME = process.argv[2];
fs.readFile(FILENAME, 'utf8', function(err, data) {
  if (err) throw err;
  var input = data.trim();


var lines = input.split("\n");

var position = [0, 0];
var minX = position[0];
var maxX = position[0];

var prev = lines[lines.length-1].split(" ")[0];
var dug = [ [position[0], position[1], prev] ];
var interesting = {};

lines.forEach(l => {
  var parts = l.split(" ");
  var color = parts[2].substring(2, 8);
  switch(color.substring(5)) {
    case "0": parts[0]="R"; break;
    case "1": parts[0]="D"; break;
    case "2": parts[0]="L"; break;
    case "3": parts[0]="U"; break;
  }
  parts[1]=parseInt(color.substring(0, 5), 16);

  interesting[position[1]] = true;
  interesting[position[1]-1] = true;
  interesting[position[1]+1] = true;

  switch(parts[0]) {
    case "R":
      for(var i=0; i<parseInt(parts[1]); i++) {
        position[1]++;
        minX = Math.min(minX, position[1]);
        maxX = Math.max(maxX, position[1]);
      }
      break;
    case "L":
      for(var i=0; i<parseInt(parts[1]); i++) {
        position[1]--;
        minX = Math.min(minX, position[1]);
        maxX = Math.max(maxX, position[1]);
      }
      break;
    case "D":
      for(var i=0; i<parseInt(parts[1]); i++) {
        position[0]++;
        minX = Math.min(minX, position[1]);
        maxX = Math.max(maxX, position[1]);
      }
      break;
    case "U":
      for(var i=0; i<parseInt(parts[1]); i++) {
        position[0]--;
        minX = Math.min(minX, position[1]);
        maxX = Math.max(maxX, position[1]);
      }
      break;
  }

});

var interestingX = Object.keys(interesting).map(e => parseInt(e)).sort((a, b) => a-b);
log("BBB");

lines.forEach((l, lIdx) => {
  var parts = l.split(" ");
  var color = parts[2].substring(2, 8);
  switch(color.substring(5)) {
    case "0": parts[0]="R"; break;
    case "1": parts[0]="D"; break;
    case "2": parts[0]="L"; break;
    case "3": parts[0]="U"; break;
  }
  parts[1]=parseInt(color.substring(0, 5), 16);

if((lIdx%100==0 || Math.floor(lIdx/100)==4)) {
log("CCC "+lIdx);
}
  switch(parts[0]) {
    case "R":
      for(var i=0; i<parseInt(parts[1]); i++) {
        if(i==0) {
          dug[dug.length-1].push(parts[0]);
        }
        position[1]++;
        if(interestingX.indexOf(position[1])>=0) {
          dug.push([position[0], position[1], 1, parts[0]]);
          minX = Math.min(minX, position[1]);
          maxX = Math.max(maxX, position[1]);
          prev = parts[0];
        }
      }
      break;
    case "L":
      for(var i=0; i<parseInt(parts[1]); i++) {
        if(i==0) {
          dug[dug.length-1].push(parts[0]);
        }
        position[1]--;
        if(interestingX.indexOf(position[1])>=0) {
          dug.push([position[0], position[1], 1, parts[0]]);
          minX = Math.min(minX, position[1]);
          maxX = Math.max(maxX, position[1]);
          prev = parts[0];
        }
      }
      break;
    case "D":
      dug[dug.length-1].push(parts[0]);
      dug.push([position[0], position[1], parseInt(parts[1]), parts[0]]);
      position[0]+=parseInt(parts[1]);
      break;
    case "U":
      dug[dug.length-1].push(parts[0]);
      dug.push([position[0], position[1], parseInt(parts[1]), parts[0]]);
      position[0]-=parseInt(parts[1]);
      break;
  }
});

dug.pop();


var result = 0;
var lastCount=0;
var last=0;
log(interestingX.length);
for(var idx=0; idx<=interestingX.length; idx++) {
  i=interestingX[idx];
  log(interestingX[idx]);
  if(i>last+1) {
    result += lastCount*(i-1-last);
    log({lastCount, last, e: i-1-last});
  }
  /*if((i%100)==0) {
    log({minX, maxX, i, p: i+minX/(maxX-minX)});
  }*/
  var count = 0;
  var filtered = dug.filter(e => e[1]==i);
  var sorted = filtered.sort((a, b) => a[0]-b[0]);
  if(sorted.length>0) {
    var inside=false;
    var min=sorted[0][0];
    for(var s=0; s<sorted.length; s++) {
      var current = sorted[s];
      var isCross = ( (current[3]=="R" || current[4]=="L") );
      if(inside) {
        if(isCross) {
          count+=current[0]-min+current[2];
          inside=false;
        }
      } else {
        if(isCross) {
          min=current[0];
          inside=true;
        } else {
          count+=current[2];
        }
      }
    }
  }
  result += count;
  lastCount = count;
  last=i;
}

log(`result: ${result}`);

}); // read file
