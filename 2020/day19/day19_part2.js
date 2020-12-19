var lines = input.split("\n");

var definition = input.split("\n\n")[0].split("\n");
var entries = input.split("\n\n")[1].split("\n");

var code = {};
definition.forEach(l => {
  var idx = l.split(":")[0];
  if(l.indexOf('"')>0) {
    code[idx] = { type: "value", value: l.charAt(l.indexOf('"')+1) };
  } else {
    code[idx] = { type: "combinations", combinations: l.split(":")[1].split("|").map(combination => {
      return combination.split(" ").filter(e => e.length>0);
    }) };
  }
});

var cache = {};

function findMatches(s, idx, from) {
  if(cache[s+"_"+idx]) return cache[s+"_"+idx];

  var matches = [];
  if(code[idx].type == "value") {
    if(code[idx].value == s.charAt(from)) {
      matches.push(from+1);
    }
  } else {
    matches = code[idx].combinations.map(c => {
      var start = [from];
      for(var i=0; i<c.length; i++) {
        var newStarts = [];
        start.forEach(st => {
          newStarts = newStarts.concat(findMatches(s, c[i], st));
        });
        start = newStarts;
      }
      return start;
    }).reduce((acc, cur) => acc.concat(cur), []);
  }
  return matches;
}

var total = entries.map(s => findMatches(s, 0, 0).indexOf(s.length)>=0).reduce((acc, cur) => acc+(cur?1:0), 0);
log("result: "+total);
