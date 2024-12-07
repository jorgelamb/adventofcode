var lines = input.split("\n");

var result = 0;

lines.forEach(l => {
  var parts = l.split(":");
  var test = parts[0]-0;
  var list = parts[1].split(" ").map(n => n-0);
  list.splice(0, 1);
  
  var options = [list[0]];
  for(var i=1; i<list.length; i++) {
    var newOptions = {};
    for(var j=0; j<options.length; j++) {
      newOptions[options[j] + list[i]] = options[j] + list[i];
      newOptions[options[j] * list[i]] = options[j] * list[i];
    }
    options = Object.values(newOptions);
  }
  if(options.indexOf(test)>=0) {
    result += test;
  }
});

log(`result: ${result}`);
