var lines = input.split("\n");

var dots = [];

var l;
for(l=0; l<lines.length && lines[l].length > 0; l++) {
  dots.push(lines[l].split(",").map(n => parseInt(n)));
}
log(dots.length);
for(l++; l<lines.length; l++) {
  //log(lines[l]);
  var fold = lines[l].split(" ")[2];
  var parts = fold.split("=");
  switch(parts[0]) {
    case "x":
      for(var d=0; d<dots.length; d++) {
        if(dots[d][0] > parts[1]) {
          dots[d][0] = 2*parts[1]-dots[d][0];
        }
      }
      break;
    case "y":
      for(var d=0; d<dots.length; d++) {
log(JSON.stringify(dots[d]));
        if(dots[d][1] > parts[1]) {
          dots[d][1] = 2*parts[1]-dots[d][1];
log("fold "+JSON.stringify(dots[d]));
        }
      }
      break;
    default: log(parts[0]); break;
  }
  for(var d=dots.length-1; d>=0; d--) {
    for(var dd=d-1; dd>=0; dd--) {
      if(dots[d][0] == dots[dd][0] && dots[d][1] == dots[dd][1]) {
        dots.splice(d, 1);
        break;
      }
    }
  }
log(JSON.stringify(dots.sort((a, b) => b[0]-a[0]).sort((a, b) => b[1]-a[1])));
log(dots.length);
  fail();
}
log(JSON.stringify(dots));
var result = "";
log("result: ${result}");
