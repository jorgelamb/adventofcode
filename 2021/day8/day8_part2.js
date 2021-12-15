var lines = input.split("\n");

var unique = [2, 3, 4, 7];
var result = 0;

for(var l=0; l<lines.length; l++) {
log(lines[l]);
  var io = lines[l].split("\|").map(e => e.trim());
  var o = io[1];
  var inputs = io[0].split(" ").map(s => s.split("").sort().join("")).sort().filter(onlyUnique);

  var digitsMap = {};
  digitsMap["1"] = inputs.filter(input => input.length == 2)[0];
  digitsMap["7"] = inputs.filter(input => input.length == 3)[0];
  digitsMap["4"] = inputs.filter(input => input.length == 4)[0];
  digitsMap["8"] = inputs.filter(input => input.length == 7)[0];
  digitsMap["9"] = inputs.filter(input => input.length == 6).filter(e => hasAllChars(e, digitsMap["4"]))[0];
  digitsMap["0"] = inputs.filter(input => input.length == 6).filter(e => hasAllChars(e, digitsMap["1"]) && e != digitsMap["9"])[0];
  digitsMap["6"] = inputs.filter(input => input.length == 6).filter(e => e!= digitsMap["0"] && e!=digitsMap["9"])[0];
  digitsMap["3"] = inputs.filter(input => input.length == 5).filter(e => hasAllChars(e, digitsMap["1"]))[0];
  digitsMap["5"] = inputs.filter(input => input.length == 5).filter(e => hasAllChars(digitsMap["9"], e) && e != digitsMap["3"])[0];
  digitsMap["2"] = inputs.filter(input => input.length == 5).filter(e => e!= digitsMap["3"] && e!=digitsMap["5"])[0];

  var outputs = io[1].split(" ").map(s => s.split("").sort().join(""));
  var number = parseInt(outputs.map(o => findDigit(digitsMap, o)).join(""), 10);
  result += number;
}

log(`result: ${result}`);

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function hasAllChars(str, from) {
  for(var c=0; c<from.length; c++) {
    if(str.indexOf(from.charAt(c))<0) { return false; }
  }
  return true;
}

function findDigit(digitsMap, d) {
  log(`finding ${d} in ${JSON.stringify(digitsMap)}`);
  var digit = Object.entries(digitsMap).filter(e => e[1] == d)[0][0];
  log(digit);
  return digit;
}
