var lines = input.split("\n");

var nodes = {};

lines.forEach(l => {
  var name = l.split(":")[0];
  var expression = l.split(" ");
  expression.shift();
  if(expression.length == 1) {
    var value = parseInt(expression[0]);
    nodes[name] = {
      name,
      value,
      resolved: true
    };
  } else {
    var op1 = expression[0];
    var operation = expression[1];
    var op2 = expression[2];
    nodes[name] = {
      name,
      op1,
      operation,
      op2,
      resolved: false
    };
  }
});

var pending = [];

Object.keys(nodes).forEach(k => {
  if(!nodes[k].resolved) {
    nodes[nodes[k].op1].dependencies = nodes[nodes[k].op1].dependencies || [];
    nodes[nodes[k].op1].dependencies.push(k);
    nodes[nodes[k].op2].dependencies = nodes[nodes[k].op2].dependencies || [];
    nodes[nodes[k].op2].dependencies.push(k);
  } else {
    pending.push(k);
  }
});

while(pending.length>0) {
  var current = pending.pop();
  var dependencies = nodes[current].dependencies || [];
  dependencies.forEach(d => {
    if(nodes[nodes[d].op1].resolved && nodes[nodes[d].op2].resolved) {
      switch(nodes[d].operation) {
        case "+":
          nodes[d].value = nodes[nodes[d].op1].value + nodes[nodes[d].op2].value;
          break;
        case "*":
          nodes[d].value = nodes[nodes[d].op1].value * nodes[nodes[d].op2].value;
          break;
        case "/":
          nodes[d].value = nodes[nodes[d].op1].value / nodes[nodes[d].op2].value;
          break;
        case "-":
          nodes[d].value = nodes[nodes[d].op1].value - nodes[nodes[d].op2].value;
          break;
        case "=":
          log(`op1: ${nodes[nodes[d].op1].value}`);
          log(`op2: ${nodes[nodes[d].op2].value}`);
          aaaa();
          break;
      }
      nodes[d].resolved = true;
      pending.push(d);
    }
  });
}

var result = nodes["root"].value;
log(`result: ${result}`);
