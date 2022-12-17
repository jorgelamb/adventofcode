var lines = input.split("\n");

var result = 0;

var next = 20;
var current = 0;

var value = 1;
var map = [];

for(var i=0; i<lines.length; i++) {
  if(lines[i]=="noop") {
    cycles = 1;
    sum = 0;
  } else {
    cycles = 2;
    sum = parseInt(lines[i].split(" ")[1]);
  }

  if(current+cycles>=next) {
    result += next * value;
    next += 40;
  }

  for(var c=0; c<cycles; c++) {
    var x = current%40;
    if(x>=value-1 && x<=value+1) {
      map.push("#");
    } else {
      map.push(".");
    }
    current++;
  }

  value+=sum;

}

for(var i=0; i<6; i++) {
  log(map.splice(0, 40).join(""));
}
