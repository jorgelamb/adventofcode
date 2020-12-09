var numbers = input.split("\n");
var last = [];
var N = (test ? 5 : 25);
for(i=0; i<N; i++) {
  last[i] = parseInt(numbers[i]);
}
for(i=N; i<numbers.length; i++) {
  var match = false;
  for(j=0; j<last.length && !match; j++) {
    for(k=j+1; k<last.length && !match; k++) {
      if(last[j]+last[k]==numbers[i]) { match = true; }
    }
  }
  if(!match) { log(numbers[i]); }
  last[i%N] = parseInt(numbers[i]);
}
