var lines = input.split("\n");

var result = 0;
lines.map(l => {
  let firstMatch = l.match(/[^\d]*(\d).*$/);
  let lastMatch = l.match(/(\d)[^\d]*$/);
  result += parseInt(firstMatch[1]+lastMatch[1]);
});

log(`result: ${result}`);
