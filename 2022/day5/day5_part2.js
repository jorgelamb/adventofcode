var blocks = input.split("\n\n");

var stacks = [[], [], [], [], [], [], [], [], [], []];
var s = blocks[0].split("\n");
s.reverse();
s.splice(0, 1);
s.forEach(l => {
  var chars = l.split("");
  for(var i=0; i<stacks.length; i++) {
    if(chars.length>(4*i+1) && chars[4*i+1]!=" ") {
      stacks[i].push(chars[4*i+1]);
    }
  }
});

blocks[1].split("\n").forEach(l => {
  var elements = l.split(" ");
  var n = parseInt(elements[1]);
  var from = parseInt(elements[3])-1;
  var to = parseInt(elements[5]-1);
  stacks[to] = stacks[to].concat(stacks[from].splice(-n));
});

var result = stacks.map(stack => stack.pop()).join("");

log(`result: ${result}`);
