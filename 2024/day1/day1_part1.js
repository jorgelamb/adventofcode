var lines = input.split("\n");

var a = [];
var b = [];

lines.forEach(l => {
  var numbers = l.split(" ");
  a.push(numbers[0]-0);
  b.push(numbers[numbers.length-1]-0);
});
a.sort();
b.sort();

var result = 0;

for(var i=0; i<a.length; i++) {
  result += Math.abs(a[i]-b[i]);
}

log(`result: ${result}`);
