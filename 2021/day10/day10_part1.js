var lines = input.split("\n");

var result = 0;

for(var l=0; l<lines.length; l++) {
  var score = getScore(lines[l]);
  result += score;
}
log(`result: ${result}`);

function getScore(line) {
  var elements = line.split("");
  var stack = [];
  for(var e=0; e<elements.length; e++) {
    switch(elements[e]) {
      case "(":
      case "[":
      case "<":
      case "{":
        stack.push(elements[e]);
        break;
      case ")":
        var top = stack.pop();
        if(top != "(") {
          return 3;
        }
        break;
      case "]":
        var top = stack.pop();
        if(top != "[") {
          return 57;
        }
        break;
      case "}":
        var top = stack.pop();
        if(top != "{") {
          return 1197;
        }
        break;
      case ">":
        var top = stack.pop();
        if(top != "<") {
          return 25137;
        }
        break;
    }
  }
  return 0;
}
