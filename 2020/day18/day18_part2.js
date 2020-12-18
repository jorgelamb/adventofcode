var lines = input.split("\n");

var result = lines.map(l => {
  var elements = l.matchAll(/([0-9\\(\\)\\+\\*])/g);
  var stack = [];

  var match = elements.next();
  while(!match.done) {
    var element = match.value[1];
    if(element == "(" || element == "+" || element == "*") {
      stack.push(element);
    } else if(element == ")") {
      var lastNumber = stack.pop();
      while(stack[stack.length-1] != "(") {
        var previous = stack.pop();
        if(previous != "*") {
          lastNumber *= parseInt(previous);
        }
      }
      var matching = stack.pop();
      if(stack.length == 0 || stack[stack.length-1] == "(") {
        stack.push(lastNumber);
      } else {
        var operator = stack.pop();
        if(operator == "+") {
          var firstNumber = stack.pop();
          stack.push(parseInt(firstNumber) + parseInt(lastNumber));
        } else if(operator == "*") {
          stack.push(operator);
          stack.push(lastNumber);
        }
      }
    } else {
      if(stack.length == 0 || stack[stack.length-1] == "(") {
        stack.push(element);
      } else {
        var operator = stack.pop();
        if(operator == "+") {
          var firstNumber = stack.pop();
          stack.push(parseInt(firstNumber) + parseInt(element));
        } else if(operator == "*") {
          stack.push(operator);
          stack.push(element);
        }
      }
    }

    match = elements.next();
  }

  var lastNumber = stack.pop();
  while(stack.length > 0) {
    var previous = stack.pop();
    if(previous != "*") {
      lastNumber *= parseInt(previous);
    }
  }
  stack.push(lastNumber);
  
  return stack;
}).map(o => o.pop()).reduce((acc, cur) => parseInt(acc)+parseInt(cur), 0);

log("result: "+result);
