var lines = input.split("\n");
var s = lines[0];

var rules = [];
for(var l=2; l<lines.length; l++) {
  var rule = [];
  rule.push(lines[l].charAt(0));
  rule.push(lines[l].charAt(1));
  rule.push(lines[l].charAt(6));
  rules.push(rule);
}


var map = {};
var toInsert = {};
for(var r=0; r<rules.length; r++) {
  var mapEntry = {};
  var rule = rules[r];
  mapEntry[rule[0]] = (mapEntry[rule[0]] || 0) + 1;
  mapEntry[rule[1]] = (mapEntry[rule[1]] || 0) + 1;
  mapEntry[rule[2]] = (mapEntry[rule[2]] || 0) + 1;
  map[""+rule[0]+rule[1]+"_1"] = mapEntry;
  toInsert[""+rule[0]+rule[1]] = rule[2];
}


var depth = 40;
var mapEntry = {};
for(var i=0; i<s.length-1; i++) {
  var part = calculate(s.charAt(i)+s.charAt(i+1), depth);
  Object.entries(part).forEach(entry => {
    mapEntry[entry[0]] = (mapEntry[entry[0]] || 0) + entry[1];
  });
  mapEntry[s.charAt(i+1)]--;
}
mapEntry[s.charAt(s.length-1)]++;

var n = Object.entries(mapEntry).sort((a, b) => b[1]-a[1]);
log(n[0][1]-n[n.length-1][1]);

function calculate(str, depth) {
if(depth<0) { fail(); }
  if(map[str+"_"+depth]) {
    return map[str+"_"+depth];
  }

  var mapEntry = {};
  var inserted = toInsert[str];
  var part1 = calculate(str.charAt(0)+inserted, depth-1);
  var part2 = calculate(inserted+str.charAt(1), depth-1);
  Object.entries(part1).forEach(entry => {
    mapEntry[entry[0]] = (mapEntry[entry[0]] || 0) + entry[1];
  });
  Object.entries(part2).forEach(entry => {
    mapEntry[entry[0]] = (mapEntry[entry[0]] || 0) + entry[1];
  });
  mapEntry[inserted]--;
  map[str+"_"+depth] = mapEntry;
  return mapEntry;
}
