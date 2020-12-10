var sorted = [0].concat(input.split("\n").map(n => parseInt(n)).sort((a, b) => a-b))
sorted = sorted.concat([sorted[sorted.length-1]+3]);
log(sorted);
var result = 0;
var a = [];
for(i=1; i<sorted.length; i++) {
  a[sorted[i]-sorted[i-1]] = a[sorted[i]-sorted[i-1]] ? a[sorted[i]-sorted[i-1]]+1 : 1;
}
result = a[1]*a[3];
