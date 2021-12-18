var lines = input.split("\n");

var numbers = lines.map(s => parseNumber(s));

var result = 0;
for(var i=0; i<numbers.length; i++) {
  for(var j=0; j<numbers.length; j++) {
    temp = add(numbers[i], numbers[j]);
    result = Math.max(getMagnitude(temp), result);
  }
}
log(`result: ${result}`);

function parseNumber(s) {
  return JSON.parse(s);
}

function add(a, b) {
  var n = [a, b];
  return reduce(n);
}

function reduce(a) {
  a = JSON.parse(JSON.stringify(a));
  var isReducing = true;
  while(isReducing) {
    isReducing = false;
    var temp = explode(a);
    if(temp) {
      a = temp;
      isReducing = true;
      continue;
    }
    temp = split(a);
    if(temp) {
      a = temp;
      isReducing = true;
      continue;
    }
  }
  return a;
}

function explode(a) {
  var positions = findPositions(a, []);
  for(var p=0; p<positions.length; p++) {
    if(positions[p].length>4 && positions[p][positions[p].length-1]==0) {
      var left = get(a, positions[p]);
      for(var pLeft = p-1; pLeft>=0; pLeft--) {
        if(isNumber(a, positions[pLeft])) {
          set(a, positions[pLeft], get(a, positions[pLeft]) + left);
          break;
        }
      }
      var right = get(a, positions[p+1]);
      for(var pRight = p+2; pRight<positions.length; pRight++) {
        if(isNumber(a, positions[pRight])) {
          set(a, positions[pRight], get(a, positions[pRight]) + right);
          break;
        }
      }
      positions[p].pop();
      set(a, positions[p], 0);
      return a;
    }
  }
  return false;
}

function split(a) {
  var positions = findPositions(a, []);
  for(var p=0; p<positions.length; p++) {
    if(isNumber(a, positions[p])) {
      var n = get(a, positions[p]);
      if(n>=10) {
	  	set(a, positions[p], [Math.floor(n/2), Math.ceil(n/2)]);
        return a;
      }
    }
  }
  return false;
}

function isNumber(a, position) {
  return typeof get(a, position) == "number";
}

function get(a, position) {
  for(var i=0; i<position.length; i++) {
    a = a[position[i]];
  }
  return a;
}

function set(a, position, v) {
  for(var i=0; i<position.length-1; i++) {
    a = a[position[i]];
  }
  a[position[position.length-1]] = v;
}

function findPositions(a, prefix, list) {
  prefix = prefix || [];
  list = list || [];
  if(typeof a == "number") {
    list.push(prefix);
    return prefix;
  } else {
    findPositions(a[0], prefix.concat(0), list);
    findPositions(a[1], prefix.concat(1), list);
    return list;
  }
}

function getMagnitude(a) {
  if(typeof a == "number") {
    return a;
  } else {
    var m = getMagnitude(a[0])*3 + getMagnitude(a[1])*2;
    return m;
  }
}
