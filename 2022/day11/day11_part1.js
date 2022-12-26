var blocks = input.split("\n\n");

function getOperation(s) {
  if(s.indexOf("old * old")>0) {
    return function(n) {
      return n * n;
  	};
  } else if(s.indexOf("old * ")>0) {
    return function(n) {
      return n * parseInt(s.split("old * ")[1]);
  	};
  } else if(s.indexOf("old + ")>0) {
    return function(n) {
      return parseInt(n) + parseInt(s.split("old + ")[1]);
  	};
  }
}

function getTest(s) {
  var divisor = s.split(" ").pop();
  return function(n) {
    return (n % divisor) == 0;
  }
}

var monkeys = blocks.map((block, index) => {
  var monkey = {};
  monkey.index = index;
  monkey.items = [];
  var lines = block.split("\n");
  monkey.items = lines[1].split(":")[1].trim().split(",").map(e => parseInt(e.trim()));
  monkey.operation = getOperation(lines[2]);
  monkey.test = getTest(lines[3]);
  monkey.ifTrue = parseInt(lines[4].split(" ").pop());
  monkey.ifFalse = parseInt(lines[5].split(" ").pop());
  monkey.inspected = 0;
  return monkey;
});

for(var i=0; i<20; i++) {
  for(var j=0; j<monkeys.length; j++) {
    var monkey = monkeys[j];
    while(monkey.items.length > 0) {
      var item = monkey.items.splice(0, 1);
      item = monkeys[j].operation(item);
      item = Math.floor(item / 3);
      var testResult = monkey.test(item);
      if(testResult) {
        monkeys[monkey.ifTrue].items.push(item);
      } else {
        monkeys[monkey.ifFalse].items.push(item);
      }
      monkey.inspected++;
    }
  }
}

var sorted = monkeys.sort((m1, m2) => m2.inspected - m1.inspected);
var result = sorted[0].inspected * sorted[1].inspected;
log(result);
