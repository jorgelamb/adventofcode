var numbers = input.split(",").map(n => parseInt(n));

var buckets = numbers.reduce((a, b) => { a[b]++; return a; }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

log(JSON.stringify(buckets));
for(var i=0; i<80; i++) {
  var temp = 0;
  for(var b=0; b<=9; b++) {
    if(b==0) {
      buckets[9]+=buckets[0];
      temp = buckets[0];
    } else {
      buckets[b-1] = buckets[b];
    }
  }
  buckets[9] = 0;
  buckets[6] += temp;
  log(`${i}: ${JSON.stringify(buckets)}`);
}

var result = buckets.reduce((a, b) => a+b, 0);
log(`result: ${result}`);
