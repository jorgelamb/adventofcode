var numbers = input.split(",").map(n => parseInt(n));

numbers = numbers.sort();
log(numbers.length);

var fuelLeft = numbers[numbers.length / 2]-1;
var fuelRight = numbers[numbers.length / 2];

var fuel = numbers.map(n => Math.abs(n-fuelLeft)).reduce((a, b) => a+b);
fuel = Math.min(fuel, numbers.map(n => Math.abs(n-fuelRight)).reduce((a, b) => a+b));
for(var i=0; i<numbers[numbers.length-1]; i++) {
  fuel = Math.min(fuel, numbers.map(n => Math.abs(n-numbers[i])).reduce((a, b) => a+b));
}

log(fuel);
