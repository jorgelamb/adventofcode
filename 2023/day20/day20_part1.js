var fs = require('fs');

function log(o) {
  console.log(JSON.stringify(o));
}

const TEST = false;

const FILENAME = process.argv[2];
fs.readFile(FILENAME, 'utf8', function(err, data) {
  if (err) throw err;
  var input = data.trim();

var lines = input.split("\n");

var modules = lines.map(l => {
  var type = "";
  var name = "";
  var outputs = [];
  var inputs = [];
  var inputValues = [];
  var state = false;

  var parts = l.split(" ");
  name = parts[0];
  switch(l.charAt(0)) {
    case "%": type="flipflop"; name=name.substring(1); break;
    case "&": type="conjuction"; name=name.substring(1); break;
    default: break;
  }
  if(parts[0]=="broadcaster") {
    type="broadcaster";
  }
  parts.splice(0, 2);
  outputs = parts.map(s => s.split(",")[0]);
  return {type, name, outputs, inputs, inputValues, state};
}).reduce((a, b) => { a[b.name]=b; return a; }, {});

Object.values(modules).forEach(module => {
  module.outputs.forEach(output => {
    if(!modules[output]) {
      modules[output] = {type: "output", name: output, outputs: [], inputs: [], inputValues: [], state: false};
    }
    modules[output].inputs.push(module.name);
    modules[output].inputValues.push(false);
  });
});
//log(modules);

var highCount = 0;
var lowCount = 0;
var pulses = [];

function processPulses() {
  while(pulses.length>0) {
    var pulse = pulses.shift();
    var moduleName = pulse[0];
    var module = modules[moduleName];
    var value = pulse[1];
    var from = pulse[2];
    if(value) {
      highCount++;
    } else {
      lowCount++;
    }
    //log({pulse, moduleName});
    switch(module.type) {
      case "broadcaster":
        module.outputs.forEach(m => pulses.push([m, value, module.name]));
        break;
      case "flipflop":
        if(value==false) {
          module.state = !module.state;
          module.outputs.forEach(m => pulses.push([m, module.state, module.name]));
        }
        break;
      case "conjuction":
        module.inputValues[module.inputs.indexOf(from)]=value;
        var and = module.inputValues.reduce((a, b) => a && b, true);
        module.outputs.forEach(m => pulses.push([m, !and, module.name]));
        break;
      case "output":
        break;
      default:
        //log(module.type);
        throw "??";
        break;
    }
  }
}

for(var i=0; i<1000; i++) {
  //console.log(i);
  pulses.push(["broadcaster", false, "button"]);
  processPulses();
}

var result = highCount*lowCount;
log(`result: ${result}   (${highCount}*${lowCount})`);

}); // read file
