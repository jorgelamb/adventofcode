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
        if(dots[d][1] > parts[1]) {
          dots[d][1] = 2*parts[1]-dots[d][1];
        }
      }
      break;
  }
  for(var d=dots.length-1; d>=0; d--) {
    for(var dd=d-1; dd>=0; dd--) {
      if(dots[d][0] == dots[dd][0] && dots[d][1] == dots[dd][1]) {
        dots.splice(d, 1);
        break;
      }
    }
  }
}
var maxX = dots.sort((a, b) => b[0]-a[0])[0][0];
var maxY = dots.sort((a, b) => b[1]-a[1])[0][1];
var output = "";
for(var y=0; y<=maxY; y++) {
  for(var x=0; x<=maxX; x++) {
    var isDot = false;
    for(var d=0; d<dots.length; d++) {
      if(dots[d][0] == x && dots[d][1]==y) {
        isDot = true;
      }
    }
    if(isDot) {
      output+="#";
    } else {
      output+=".";
    }
  }
  output+="\n";
}
//log(maxX);
//log(maxY);
log(output);
log(JSON.stringify(dots.sort((a, b) => b[0]-a[0]).sort((a, b) => b[1]-a[1])));
log("result: ${result}");
