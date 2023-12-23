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

var workflows = blocks[0].split("\n").map(w => {
  var wParts = w.split("{");
  var name = wParts[0];
  var ruleDefinitions = wParts[1].substring(0, wParts[1].length-1).split(",");
  return [name, ruleDefinitions];
}).reduce((a, b) => { a[b[0]] = b[1]; return a; }, {});

var ratings = blocks[1].split("\n").map(r => {
  return r.substring(0, r.length-1).split(",").map(e => parseInt(e.split("=")[1]));
});

var result = 0;

for(var i=0; i<ratings.length; i++) {
  var current = "in";
  while(current != "A" && current != "R") {
    current = getNext(workflows[current], ratings[i]);
  }
  if(current == "A") {
    result += ratings[i].reduce((a, b) => a+b, 0);
  }
}

log(`result: ${result}`);
