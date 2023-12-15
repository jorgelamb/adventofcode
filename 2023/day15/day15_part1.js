var lines = input.split(",");

function hash(s) {
  var current = 0;
  
  for(var i=0; i<s.length; i++) {
    current += s.charCodeAt(i);
    current *= 17;
    current %= 256;
  }
  return current;
}

var result = lines.map(l => hash(l)).reduce((a, b) => a+b, 0);

log(`result: ${result}`);
