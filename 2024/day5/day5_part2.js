var blocks = input.split("\n\n");
var rules = blocks[0].split("\n").map(l => l.split("\|").map(n => n-0));
var lists = blocks[1].split("\n").map(l => l.split(",").map(n => n-0));

var mapRules = {};
rules.forEach(rule => {
  mapRules[rule[0]] = mapRules[rule[0]] || [];
  mapRules[rule[0]].push(rule[1]);
});

var result = lists.map(list => {
  for(var i=0; i<list.length; i++) {
    var element = list[i];
    var elementRules = mapRules[element] || [];
    if(elementRules.length==0) {
      continue;
    }
    for(var j=0; j<i; j++) {
      if(elementRules.indexOf(list[j])>=0) {
        list.sort((a, b) => {
          var rulesA = mapRules[a] || [];
          if(rulesA.indexOf(b)>=0) {
            return -1;
          }
          var rulesB = mapRules[b] || [];
          if(rulesB.indexOf(a)>=0) {
            return 1;
          }
          return 0;
        });
        return list[(list.length-1)/2];
      }
    }
  }
  return 0;
}).reduce((a, b) => a+b, 0);

log(`result: ${result}`);
