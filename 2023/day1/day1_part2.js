var lines = input.split("\n");

function toDigit(s) {
  switch(s) {
    case "one": return "1";
    case "two": return "2";
    case "three": return "3";
    case "four": return "4";
    case "five": return "5";
    case "six": return "6";
    case "seven": return "7";
    case "eight": return "8";
    case "nine": return "9";
    default: return s;
  }
}

var result = 0;
lines.map(l => {
  let firstMatch = l.match(/^[^\d]*?(\d|one|two|three|four|five|six|seven|eight|nine).*$/);
  let lastMatch = l.match(/.*(\d|one|two|three|four|five|six|seven|eight|nine)[^\d]*$/);
  let first = toDigit(firstMatch[1]);
  let last = toDigit(lastMatch[1]);
  result += parseInt(first + last);
});

log(`result: ${result}`);
