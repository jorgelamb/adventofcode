var numbers = input.split("\n");
var N = (test ? 127 : 22477624);
for(i=0; i<numbers.length; i++) {
  var sum = 0;
  var min = 999999999999;
  var max = 0;
  var size = 0;

  for(j=i; j<numbers.length && sum < N; j++) {
    var curr = parseInt(numbers[j]);
    sum += curr;
    min = Math.min(min, curr);
    max = Math.max(max, curr);
    size++;
  }
  if(size>1 && sum==N) {
    var result = min + max;
    log("Min: "+min+", Max: "+max+", Min+Max: "+result);
  }
}
