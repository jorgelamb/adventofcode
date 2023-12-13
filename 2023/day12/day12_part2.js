var fs = require('fs');

function log(o) {
  console.log(JSON.stringify(o));
}

const TEST = false;

const FILENAME = process.argv[2];
fs.readFile(FILENAME, 'utf8', function(err, data) {
  if (err) throw err;
  var input = data.trim();


var lines = input.split("\n");

var cache = {};

function findArrangements(str, numbers, canBeOperational, canBeDamaged) {
  //log({str, numbers, canBeOperational, canBeDamaged});
  var cacheKey = `${str}_${numbers}_${canBeOperational}_${canBeDamaged}`;
  var cached = cache[cacheKey];
  if(cached != undefined) {
    return cached;
  }
  if(str=="") {
    if(numbers.length==0) {
      count = 1;
      cache[cacheKey] = count
      return count;
    } else {
      count = 0;
      cache[cacheKey] = count
      return count;
    }
  }
  var count = 0;
  switch(str.charAt(0)) {
    case ".":
      if(canBeOperational) {
        count = findArrangements(str.substring(1), numbers, true, true);
        cache[cacheKey] = count
        return count;
      } else {
        count = 0;
        cache[cacheKey] = count
        return count;
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
          count = findArrangements(str.substring(1), newNumbers, true, false);
          cache[cacheKey] = count
          return count;
        } else {
          newNumbers[0] = nextDamaged;
          count = findArrangements(str.substring(1), newNumbers, false, true);
          cache[cacheKey] = count
          return count;
        }
      } else {
        count = 0;
        cache[cacheKey] = count
        return count;
      }
      break;

    case "?":
      count = 0;
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
      cache[cacheKey] = count
      return count;

  }
}

function calculate(l) {
  cache = {};
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
