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
      resolved: true,
      halfResolved: true
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
      resolved: false,
      halfResolved: false
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

nodes["root"].operation = "=";
nodes["humn"].resolved = false;
if(pending.indexOf("humn")>=0) {
  pending.splice(pending.indexOf("humn"), 0);
}


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
          break;
      }
      nodes[d].resolved = true;
      nodes[d].halfResolved = true;
      pending.push(d);
    }
  });
}

nodes["humn"].halfResolved = true;
nodes["humn"].value = "humn";
pending.push("humn");


while(pending.length>0) {
  var current = pending.pop();
  var dependencies = nodes[current].dependencies || [];
  dependencies.forEach(d => {
    if(nodes[nodes[d].op1].halfResolved && nodes[nodes[d].op2].halfResolved) {
      switch(nodes[d].operation) {
        case "+":
          nodes[d].value = `(${nodes[nodes[d].op1].value} + ${nodes[nodes[d].op2].value})`;
          break;
        case "*":
          nodes[d].value = `(${nodes[nodes[d].op1].value} * ${nodes[nodes[d].op2].value})`;
          break;
        case "/":
          nodes[d].value = `(${nodes[nodes[d].op1].value} / ${nodes[nodes[d].op2].value})`;
          break;
        case "-":
          nodes[d].value = `(${nodes[nodes[d].op1].value} - ${nodes[nodes[d].op2].value})`;
          break;
        case "=":
          break;
      }
      nodes[d].halfResolved = true;
      pending.push(d);
    }
  });
}

var node = nodes["root"];
var isFirstResolved = nodes[node.op1].resolved;
var resolved = nodes[node.op1].resolved ? nodes[node.op1] : nodes[node.op2];
var notResolved = nodes[node.op1].resolved ? nodes[node.op2] : nodes[node.op1];
var valueToMatch = resolved.value;
node = notResolved;
while(true) {
  isFirstResolved = nodes[node.op1].resolved;
  resolved = nodes[node.op1].resolved ? nodes[node.op1] : nodes[node.op2];
  notResolved = nodes[node.op1].resolved ? nodes[node.op2] : nodes[node.op1];
  switch(node.operation) {
    case "+":
      valueToMatch -= resolved.value;
      node = notResolved;
      break;
    case "-":
      if(isFirstResolved) {
        valueToMatch = resolved.value - valueToMatch;
      } else {
        valueToMatch += resolved.value;
      }
      node = notResolved;
      break;
    case "/":
      if(isFirstResolved) {
        valueToMatch = resolved.value / valueToMatch;
      } else {
        valueToMatch *= resolved.value;
      }
      node = notResolved;
      break;
    case "*":
      valueToMatch /= resolved.value;
      node = notResolved;
      break;
  }
  if(node.name == "humn") {
    break;
  }
}

var result = valueToMatch;
log(`result: ${result}`);
