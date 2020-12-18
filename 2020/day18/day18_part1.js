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
      var matching = stack.pop();
      if(stack.length == 0 || stack[stack.length-1] == "(") {
        stack.push(lastNumber);
      } else {
        var operator = stack.pop();
        if(operator == "+") {
          var firstNumber = stack.pop();
          stack.push(parseInt(firstNumber) + parseInt(lastNumber));
        } else if(operator == "*") {
          var firstNumber = stack.pop();
          stack.push(firstNumber * lastNumber);
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
          var firstNumber = stack.pop();
          stack.push(firstNumber * element);
        }
      }
    }

    match = elements.next();
  }

  return stack;
}).map(o => o.pop()).reduce((acc, cur) => parseInt(acc)+parseInt(cur), 0);

log("result: "+result);
