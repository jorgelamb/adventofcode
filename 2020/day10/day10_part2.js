var sorted = [0].concat(input.split("\n").map(n => parseInt(n)).sort((a, b) => a-b))
sorted = sorted.concat([sorted[sorted.length-1]+3]);
var result = 0;
var a = [];
var combinations = new Array(sorted.length).fill(0);
combinations[combinations.length-1] = 1;
for(i=combinations.length-1; i>=0; i--) {
  for(j=i+1; j<combinations.length && sorted[j]<=sorted[i]+3; j++) {
    combinations[i] += combinations[j];
  }
}
result = combinations[0];
log("result: "+result);
