var lines = input.split("\n");

var result = 0;
var scores = [];

for(var l=0; l<lines.length; l++) {
  var score = getScore(lines[l]);
  if(score > 0) { scores.push(score); }
}
log(scores);
result = scores.sort((a, b) => b-a)[(scores.length-1)/2];

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
          return 0;
        }
        break;
      case "]":
        var top = stack.pop();
        if(top != "[") {
          return 0;
        }
        break;
      case "}":
        var top = stack.pop();
        if(top != "{") {
          return 0;
        }
        break;
      case ">":
        var top = stack.pop();
        if(top != "<") {
          return 0;
        }
        break;
    }
  }

  var score = 0;
  while(a = stack.pop()) {
    score *= 5;
    switch(a) {
      case "(": score += 1; break;
      case "[": score += 2; break;
      case "{": score += 3; break;
      case "<": score += 4; break;
    }
  }
  return score;
}
