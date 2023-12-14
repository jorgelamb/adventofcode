var lines = input.split("\n");
var map = lines.map(l => l.split(""));

var rocks = [];
for(var i=0; i<map.length; i++) {
  for(var j=0; j<map[0].length; j++) {
    switch(map[i][j]) {
      case "#":
        rocks.push([i, j, "#"]);
        break;
      case "O":
        rocks.push([i, j, "O"]);
        break;
    }
  }
}

function moveNorth() {
  rocks.sort((a, b) => a[0]-b[0]);
  for(var r=0; r<rocks.length; r++) {
    var rock = rocks[r];
    if(rock[2]=="O") {
      var filtered = rocks.filter(e => e[1]==rock[1] && e[0]<rock[0]);
      if(filtered.length>0) {
        rocks[r][0]=filtered[filtered.length-1][0]+1;
      } else {
        rocks[r][0]=0;
      }
    }
  }
}

function moveSouth() {
  rocks.sort((a, b) => b[0]-a[0]);
  for(var r=0; r<rocks.length; r++) {
    var rock = rocks[r];
    if(rock[2]=="O") {
      var filtered = rocks.filter(e => e[1]==rock[1] && e[0]>rock[0]);
      if(filtered.length>0) {
        rocks[r][0]=filtered[filtered.length-1][0]-1;
      } else {
        rocks[r][0]=map.length-1;
      }
    }
  }
}

function moveWest() {
  rocks.sort((a, b) => a[1]-b[1]);
  for(var r=0; r<rocks.length; r++) {
    var rock = rocks[r];
    if(rock[2]=="O") {
      var filtered = rocks.filter(e => e[0]==rock[0] && e[1]<rock[1]);
      if(filtered.length>0) {
        rocks[r][1]=filtered[filtered.length-1][1]+1;
      } else {
        rocks[r][1]=0;
      }
    }
  }
}

function moveEast() {
  rocks.sort((a, b) => b[1]-a[1]);
  for(var r=0; r<rocks.length; r++) {
    var rock = rocks[r];
    if(rock[2]=="O") {
      var filtered = rocks.filter(e => e[0]==rock[0] && e[1]>rock[1]);
      if(filtered.length>0) {
        rocks[r][1]=filtered[filtered.length-1][1]-1;
      } else {
        rocks[r][1]=map[0].length-1;
      }
    }
  }
}

function calculateLoad() {
  var movable = rocks.filter(e => e[2]=="O");
  var result = 0;
  for(var j=0; j<map[0].length; j++) {
    for(var i=0; i<map.length; i++) {
      if(movable.filter(e => e[0]==i && e[1]==j).length>0) {
        result += map.length-i;
      }
    }
  }
  return result;
}

function logRocks() {
  for(var i=0; i<map.length; i++) {
    var s="";
    for(var j=0; j<map[0].length; j++) {
      var rock = rocks.filter(e => e[0]==i && e[1]==j);
      if(rock.length>0) {
        s+=rock[0][2];
      } else {
        s+=".";
      }
    }
    log(s);
  }
  log("");
}

var cache={};
function getCacheKey() {
  var temp = rocks.filter(e => e[2]=="O");
  temp.sort((a, b) => b[1]-a[1]).sort((a, b) => b[0]-a[0]);
  return temp.reduce((a, b) => a+"_"+b.join(","), "");
}

for(var i=0; i<200; i++) {
  moveNorth();
  moveWest();
  moveSouth();
  moveEast();

  //logRocks();

  var cacheKey = getCacheKey();
  var cached = cache[cacheKey];
  if(cached) {
    //log(`Found loop ${cacheKey} ${cached} ${i}`);
    var loopLength = cached-i;
    if((1000000000-i-1) % loopLength == 0) {
      result = calculateLoad();
      break;
    }
  } else {
    cache[cacheKey] = i;
  }
}


log(`result: ${result}`);
