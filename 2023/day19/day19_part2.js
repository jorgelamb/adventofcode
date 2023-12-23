var fs = require('fs');

function log(o) {
  console.log(JSON.stringify(o));
}

const TEST = false;

const FILENAME = process.argv[2];
fs.readFile(FILENAME, 'utf8', function(err, data) {
  if (err) throw err;
  var input = data.trim();

var blocks = input.split("\n\n");

function getValue(rating, value) {
  return rating["xmas".indexOf(value)];
}

function getNext(rules, rating) {
  for(var r=0; r<rules.length; r++) {
    var rule = rules[r];
    var ruleParts = rule.split(":");
    if(ruleParts.length==1) {
      return ruleParts[0];
    }
    
    var ltParts = ruleParts[0].split("<");
    if(ltParts.length > 1) {
      var v = parseInt(ltParts[1]);
      if(getValue(rating, ltParts[0])<v) {
        return ruleParts[1];
      }
    }
    var gtParts = ruleParts[0].split(">");
    if(gtParts.length > 1) {
      var v = parseInt(gtParts[1]);
      if(getValue(rating, gtParts[0])>v) {
        return ruleParts[1];
      }
    }
  }
  throw "???";
}

var interesting = [[1, 4001], [1, 4001], [1, 4001], [1, 4001]];

var workflows = blocks[0].split("\n").map(w => {
  var wParts = w.split("{");
  var name = wParts[0];
  var ruleDefinitions = wParts[1].substring(0, wParts[1].length-1).split(",");
  
  for(var r=0; r<ruleDefinitions.length; r++) {
    var rule = ruleDefinitions[r];
    var ruleParts = rule.split(":");
    if(ruleParts.length==1) {
      continue;
    }
    
    var ltParts = ruleParts[0].split("<");
    if(ltParts.length > 1) {
      var variable = ltParts[0];
      var v = parseInt(ltParts[1]);
      interesting["xmas".indexOf(variable)].push(v);
    }
    var gtParts = ruleParts[0].split(">");
    if(gtParts.length > 1) {
      var variable = gtParts[0];
      var v = parseInt(gtParts[1]);
      interesting["xmas".indexOf(variable)].push(v+1);
    }
  }
  
  return [name, ruleDefinitions];
}).reduce((a, b) => { a[b[0]] = b[1]; return a; }, {});

interesting = interesting.map(list => {
  return list.sort((a, b) => a-b).filter((e, idx) => list.indexOf(e) == idx).sort((a, b) => a-b);
});

var result = 0;
var rejected = 0;

function getSizes(lists) {
  var temp = lists.map((list, idx) => {
    var sum = list.map(e => {
      var elementIdx = interesting[idx].indexOf(e);
      return interesting[idx][elementIdx+1]-interesting[idx][elementIdx];
    }).reduce((a, b) => a+b, 0);
    return sum;
  }).reduce((a, b) => a*b, 1);
  return temp;
}

function process(lists, name, debug) {
var processSize = getSizes(lists);
var processPrev = rejected;
  if(name=="A") {
    return getSizes(lists);
  } else if(name=="R") {
    rejected += getSizes(lists);
    return 0;
  }
  var rules = workflows[name];
  var temp = 0;
  for(var r=0; r<rules.length; r++) {
    var rule = rules[r];
    var ruleParts = rule.split(":");
    if(ruleParts.length==1) {
      if(ruleParts[0]=="A") {
        temp += getSizes(lists);
      } else if(ruleParts[0]=="R") {
        // Do nothing
        rejected += getSizes(lists);
      } else {
        temp += process(lists, ruleParts[0]);
      }
    }
    
    var ltParts = ruleParts[0].split("<");
    if(ltParts.length > 1) {
var splitTotal = getSizes(lists);
      var idx = "xmas".indexOf(ltParts[0]);
      var v = parseInt(ltParts[1]);
      var tempLists = [...lists];
      var tempList = [...tempLists[idx]];
      tempList = tempList.filter(e => e<v);
      tempLists[idx] = tempList;
var partASize = getSizes(tempLists);
var prev = temp+rejected;
      temp += process(tempLists, ruleParts[1]);
var after = temp+rejected;
      lists = [...lists];
      lists[idx]=lists[idx].filter(e => e>=v);
var partBSize = getSizes(lists);
    }
    var gtParts = ruleParts[0].split(">");
    if(gtParts.length > 1) {
var splitTotal = getSizes(lists);
      var idx = "xmas".indexOf(gtParts[0]);
      var v = parseInt(gtParts[1]);
      var tempLists = [...lists];
      var tempList = [...tempLists[idx]];
      tempList = tempList.filter(e => e>v);
      tempLists[idx] = tempList;
var partASize = getSizes(tempLists);
var prev = temp+rejected;
      temp += process(tempLists, ruleParts[1]);
var after = temp+rejected;
      lists = [...lists];
      lists[idx]=lists[idx].filter(e => e<=v);
var partBSize = getSizes(lists);
    }
  }

  return temp;
}

var result = process(interesting.map(e => e.filter(n => n<=4000)), "in", true);
log(`result: ${result}\t(rejected: ${rejected}; total: ${result+rejected})`);

}); // read file
