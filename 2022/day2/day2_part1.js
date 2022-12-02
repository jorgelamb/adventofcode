var lines = input.split("\n");

const ABC = "ABC";
const XYZ = "XYZ";
var permutations = ["ABC"];

var scores = permutations.map(permutation => {
  var score = 0;
  lines.forEach(l => {
    var my = ABC.indexOf(permutation.charAt(XYZ.indexOf(l.charAt(2))));
    var theirs = ABC.indexOf(l.charAt(0));
    score += my+1;
    if((theirs+1)%3 == my) {
      score += 6;
    } else if(my == theirs) {
      score += 3;
    }
  });
  return score;
});
log(scores);
var result = scores.sort((a, b) => a-b).pop();
log(`result: ${result}`);
