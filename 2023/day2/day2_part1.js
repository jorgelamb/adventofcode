var lines = input.split("\n");

var result =0;
lines.forEach((l, idx) => {
  var subsets = l.split(":")[1].trim();
  var subsetsArray = subsets.split(";");
  var isPossible = true;
  subsetsArray.forEach((subset) => {
    var colorCubes = subset.trim().split(",");
    colorCubes.forEach((colorCube) => {
      var colorNumber = colorCube.trim().split(" ");
      switch(colorNumber[1]) {
        case "red": if(parseInt(colorNumber[0].trim())>12) isPossible=false; break;
        case "green": if(parseInt(colorNumber[0].trim())>13) isPossible=false; break;
        case "blue": if(parseInt(colorNumber[0].trim())>14) isPossible=false; break;
        default: log(colorNumber[1]); break;
      }
    });
  });
  if(isPossible) {
    result += idx+1;
  }
});

log(`result: ${result}`);
