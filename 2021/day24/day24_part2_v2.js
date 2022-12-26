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

const LEADING = parseInt(process.argv[2] || 9);
log(LEADING);

var found = false;
var model;

var state = [0, 0, 0, 0];
runRecursive(program, 0, state, 0, "");

function runRecursive(program, startLine, state, depth, prefix) {
 //try {
  if(depth == 2) {
    log(prefix);
  }
  var key = state.join("_")+"_"+startLine;
  if(cache[key]) {
    cache[key]++;
    //if(depth == 13) { log(` key: ${key} --> ${cache[key]}`); }
    return;
  }
  for(var l=startLine; l<program.length; l++) {
    var parts = program[l];
    switch(parts[0]) {
      case "inp":
        var newState = [...state];
        for(var newInput=(depth==0 ? LEADING : 1); newInput<=(depth==0 ? LEADING : (depth==1 ? 2 : 9)); newInput++) {
        //for(var newInput=(depth==0 ? LEADING : (depth==1 ? 2 : 9)); newInput>=(depth==0 ? LEADING : 1); newInput--) {
        //for(var newInput=9; newInput>=1; newInput--) {
          for(var i=0; i<state.length; i++) {
            newState[i] = state[i];
          }
          setValue(parts[1], newInput, newState);
          runRecursive(program, l+1, newState, depth+1, prefix+newInput);
        }
        //if(depth%2==0) {
          cache[key] = (cache[key] || 0)+1;
	//}
        //if(depth == 13) { log(` adding key: ${key} --> ${cache[key]}`); }
        return;

      case "add":
        setValue(parts[1], getValue(parts[1], state) + getValue(parts[2], state), state);
        break;
        
      case "mul":
    //log(`MUL: ${prefix} ${startLine} ${state} ${depth} ${prefix}`);
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
      default:
        bbbbbbbbb();
        exit();
    }
  }
  if(state[2]==0) {
    found = true;
    log(state);
    log(prefix);
    exit();
    aaaaaaaa();
  }
  return state;
 // } catch(e) { console.log(e.message); return {}}
}

function setValue(variable, value, state) {
  var idx = "xyzw".indexOf(variable);
  state[idx] = value;
}

function getValue(variable, state) {
  var idx = "xyzw".indexOf(variable);
  if(idx>=0) {
    return state[idx];
  } else {
    return parseInt(variable);
  }
}

log(`result: ${model} (${found})`);



});
