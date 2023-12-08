var fs = require('fs');

function log(o) {
  console.log(JSON.stringify(o));
}

const TEST = false;

const FILENAME = (TEST ? 'test.txt' : 'input.txt');
fs.readFile(FILENAME, 'utf8', function(err, data) {
  if (err) throw err;
  var input = data.trim();



var lines = input.split("\n");

var instructions = lines[0].split("");
var map = {};
var loopDetector = {};

var current = [];

input.split("\n\n")[1].split("\n").forEach(l => {
  var origin = l.substring(0, 3);
  var left = l.substring(7, 10);
  var right = l.substring(12, 15);
  var isFinal = origin.charAt(2)=="Z";
  var isStart = origin.charAt(2)=="A";
  map[origin] = {L: left, R: right, isFinal: isFinal};
  if(isStart) {
    current.push(origin);
  }
});

var searching = true;
var count = 0;
while(searching) {
  for(var i=0; i<instructions.length && searching; i++) {
    count++;
    if((count%10000000)==0) {
      console.log("Do LCM of cycle lengths");
      exit();/* Do LCM(cycleLengths) */
    }
    var allFinal = true;
    var finalNodes = [];
    for(var c=0; c<current.length; c++) {
      //log({i: instructions[i], c: current[c], n: map[current[c]][instructions[i]]});
      current[c] = map[current[c]][instructions[i]];
      if(!map[current[c]].isFinal) {
        allFinal = false;
      } else {
        loopDetector[current[c]] = loopDetector[current[c]] || {};
        loopDetector[current[c]][c] = loopDetector[current[c]][c] || {};
        if(!loopDetector[current[c]][c].cycleLength) {
          if(loopDetector[current[c]][c].last) {
            loopDetector[current[c]][c].cycleLength = count-loopDetector[current[c]][c].last;
            console.log(loopDetector);
          } else {
            loopDetector[current[c]][c].last = count;
            console.log(loopDetector);
          }
        }
      }
    }
    if(allFinal) {
      searching = false;
    } else { if(finalNodes.length>0) console.log(count +" "+ finalNodes); }
  }
}

var result = count;
log(`result: ${result}`);


}); // read file
