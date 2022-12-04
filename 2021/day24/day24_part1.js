function log(s) {
  console.log(JSON.stringify(s));
}

var fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, data) {
  if (err) throw err;
  var input = data.trim();


var lines = input.split("\n");
var program = lines.map(line => line.split(" "));

var cache = [];


var found = false;
var model;
//for(model=13579246899999; model>0 && !found; model--) {
  ////found = true;
//for(model=99999999999999; model>0 && !found; model--) {
//for(model=99999999999999; model>99999999999997 && !found; model--) {
//for(model=99982337000000; model>0 && !found; model--) {
for(model=99942983000000; model>0 && !found; model--) {
  if(model % 1000000 == 0) { log(model); }
  var model_string = model.toString();
  if(model_string.indexOf("0")>=0) {
    continue;
  }
  
  //log(model);
  //log(model_string.split("").map(n => parseInt(n)));
	
  var state = runProgram(program, model_string.split("").map(n => parseInt(n)));
  //log(state);
  if(state.z==0) {
    found = true;
    log(state);
    break;
  }
}

function storeCache(input, line, state) {
  if(state.position>4) {
    var strKey = input.slice(0, state.position-1).join("");
//log(`storing ${strKey} at ${state.position}`);
//log(cache);
    cache[state.position] = [strKey, line, JSON.stringify(state)];
  }
}

function getBestCache(input) {
  for(var i=input.length; i>=0; i--) {
    var strKey = input.slice(0, i-1).join("");
//log(`checking ${strKey} at ${i}`);
    var fromCache = cache[i];
    if(fromCache && fromCache[0] == strKey) {
      return fromCache;
    }
  }
}

function runProgram(program, input) {
 try {
  var state = { x: 0, y: 0, z: 0, w: 0, position: 0 };
  var startLine = 0;
  var fromCache = getBestCache(input);
  if(fromCache) {
//log(`Found cache to reuse: ${JSON.stringify(fromCache)}`);
    startLine = fromCache[1];
    state = JSON.parse(fromCache[2]);
  }
  for(var l=startLine; l<lines.length; l++) {
    //log(state);
    var parts = program[l];
    //log(parts);
    switch(parts[0]) {
      case "inp":
        var value = input[state.position];
        state.position++;
        setValue(parts[1], value, state);
        storeCache(input, l+1, state);
        break;

      case "add":
        setValue(parts[1], getValue(parts[1], state) + getValue(parts[2], state), state);
        break;
        
      case "mul":
        setValue(parts[1], getValue(parts[1], state) * getValue(parts[2], state), state);
        break;

      case "div":
        setValue(parts[1], Math.trunc(getValue(parts[1], state) / getValue(parts[2], state)), state);
        break;

      case "mod":
        setValue(parts[1], getValue(parts[1], state) % getValue(parts[2], state), state);
        break;

      case "eql":
        if(getValue(parts[1], state) == getValue(parts[2], state)) {
          setValue(parts[1], 1, state);
        } else {
          setValue(parts[1], 0, state);
        }
        break;
    }
  }
  return state;
 }
 catch(e) { console.log(e.message); return {}}
}

function setValue(variable, value, state) {
  state[variable] = value;
}

function getValue(variable, state) {
  if("xyzw".indexOf(variable)>=0) {
    return state[variable];
  } else {
    return parseInt(variable);
  }
}

log(`result: ${model} (${found})`);



});
