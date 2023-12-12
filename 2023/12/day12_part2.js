var fs = require('fs');

function log(o) {
  console.log(JSON.stringify(o));
}

const TEST = false;

const FILENAME = (TEST ? 'test.txt' : 'input.txt');
fs.readFile(FILENAME, 'utf8', function(err, data) {
  if (err) throw err;
  var input = data.trim();


var lines = input.split("\n");

function findArrangements(str, numbers, canBeOperational, canBeDamaged) {
  //log({str, numbers, canBeOperational, canBeDamaged});
  if(str=="") {
    if(numbers.length==0) {
      return 1;
    } else {
      return 0;
    }
  }
  switch(str.charAt(0)) {
    case ".":
      if(canBeOperational) {
        return findArrangements(str.substring(1), numbers, true, true);
      } else {
        return 0;
      }
      break;

    case "#":
      if(numbers.length==0) {
        return 0;
      }
      if(canBeDamaged) {
        var nextDamaged = numbers[0];
        nextDamaged--;
        //log(numbers);
        var newNumbers = [...numbers];
        if(nextDamaged==0) {
          newNumbers.splice(0, 1);
          return findArrangements(str.substring(1), newNumbers, true, false);
        } else {
          newNumbers[0] = nextDamaged;
          return findArrangements(str.substring(1), newNumbers, false, true);
        }
      } else {
        return 0;
      }
      break;

    case "?":
      var count = 0;
      if(numbers.length==0) {
        canBeDamaged=false;
      }
      if(canBeOperational) {
        count += findArrangements(str.substring(1), numbers, true, true);
      }
      if(canBeDamaged) {
        var nextDamaged = numbers[0];
        nextDamaged--;
        var newNumbers = [...numbers];
        if(nextDamaged==0) {
          newNumbers.splice(0, 1);
          count += findArrangements(str.substring(1), newNumbers, true, false);
        } else {
          newNumbers[0] = nextDamaged;
          count += findArrangements(str.substring(1), newNumbers, false, true);
        }
      }
      return count;

  }
}

function calculate(l) {
  var str = l.split(" ")[0];
  str = [str, str, str, str, str].join("?");
  var numbers = l.split(" ")[1].split(",").map(n => parseInt(n));
  numbers = [...numbers, ...numbers, ...numbers, ...numbers, ...numbers];
  var count = findArrangements(str, numbers, true, true);
  //log(l);
  log(count);
  return count;
}

var result = lines.map(l => calculate(l)).reduce((a, b) => a+b, 0);

log(`result: ${result}`);

}); // read file
