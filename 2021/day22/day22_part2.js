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

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function parseRule(s) {
  var r = {};
  r.mode = s.split(" ")[0] == "on";
  r.coordinates = s.match(/[-0-9]+/g).map(s => parseInt(s));
  return r;
}
var rules = lines.map(parseRule);
var xPositions = rules.map(r => r.coordinates[0]).concat(rules.map(r => r.coordinates[1]+1)).sort((a, b) => a-b).filter(onlyUnique);
var yPositions = rules.map(r => r.coordinates[2]).concat(rules.map(r => r.coordinates[3]+1)).sort((a, b) => a-b).filter(onlyUnique);
var zPositions = rules.map(r => r.coordinates[4]).concat(rules.map(r => r.coordinates[5]+1)).sort((a, b) => a-b).filter(onlyUnique);

var result = 0;
for(var x=0; x<xPositions.length-1; x++) {
  var xx = xPositions[x];
  for(var y=0; y<yPositions.length-1; y++) {
    var yy = yPositions[y];
    for(var z=0; z<zPositions.length-1; z++) {
      var zz = zPositions[z];
      var ruleFound = false;
      for(var r=rules.length-1; r>=0 && !ruleFound; r--) {
        var rule = rules[r];
        if(xx>=rule.coordinates[0] && xx<=rule.coordinates[1]
           && yy>=rule.coordinates[2] && yy<=rule.coordinates[3]
           && zz>=rule.coordinates[4] && zz<=rule.coordinates[5]) {

          if(rule.mode) {
            result += (xPositions[x+1]-xPositions[x])*(yPositions[y+1]-yPositions[y])*(zPositions[z+1]-zPositions[z]);
          }
	  ruleFound = true;
          break;
        }
      }
    }
  }
}

log(`result: ${result}`);

}); // read file
