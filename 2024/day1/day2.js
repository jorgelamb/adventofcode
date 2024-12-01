var lines = input.split("\n");

var a = [];
var b = [];

lines.forEach(l => {
  var numbers = l.split(" ");
  a.push(numbers[0]-0);
  b.push(numbers[numbers.length-1]-0);
});

var result = 0;

for(var i=0; i<a.length; i++) {
  result += a[i] * b.filter(e => e==a[i]).length;
}

log(`result: ${result}`);
