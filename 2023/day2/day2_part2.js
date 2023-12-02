var lines = input.split("\n");

var result =0;
lines.forEach((l, idx) => {
  var subsets = l.split(":")[1].trim();
  var subsetsArray = subsets.split(";");
  var isPossible = true;
  var red = 0;
  var green = 0;
  var blue = 0;
  subsetsArray.forEach((subset) => {
    var colorCubes = subset.trim().split(",");
    colorCubes.forEach((colorCube) => {
      var colorNumber = colorCube.trim().split(" ");
      var n = parseInt(colorNumber[0].trim());
      switch(colorNumber[1]) {
        case "red": if(n>red) red=n; break;
        case "green": if(n>green) green=n; break;
        case "blue": if(n>blue) blue=n; break;
        default: log(colorNumber[1]); break;
      }
    });
  });
  result += red*green*blue;
});

log(`result: ${result}`);
