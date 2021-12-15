var lines = input.split("\n");
var s = lines[0].split("");

var rules = [];
for(var l=2; l<lines.length; l++) {
  var rule = [];
  rule.push(lines[l].charAt(0));
  rule.push(lines[l].charAt(1));
  rule.push(lines[l].charAt(6));
  rules.push(rule);
}

for(j=0; j<10; j++) {
  for(var i=0; i<s.length-1; i++) {
    for(var r=0; r<rules.length; r++) {
      if(s[i]==rules[r][0] && s[i+1]==rules[r][1]) {
        s.splice(i+1, 0, rules[r][2]);
        i++;
        break;
      }
    }
  }
}
var counts = s.reduce((a, b) => { a[b] = a[b]||0; a[b]++; return a; }, {});
var sorted = Object.entries(counts).sort((a, b) => b[1]-a[1]);
var result = sorted[0][1]-sorted[sorted.length-1][1];

log(`result: ${result}`);
