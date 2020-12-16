var lines = input.split("\n");
var fields = [];
var i = 0;
for(i=0; lines[i]!=""; i++) {
  var name = lines[i].split(":")[0];
  var rangesDescription = lines[i].split(": ")[1].split(" or ");
  var ranges = [];
  for(var r=0; r<rangesDescription.length; r++) {
    ranges.push(rangesDescription[r].split("-").map(v => parseInt(v)));
  }
  fields.push({name: name, ranges: ranges});
}

i++;
for( ; lines[i]!=""; i++) {
  // "your ticket"
}

var total = 0;

i++;
i++;
for( ; i<lines.length && lines[i]!=""; i++) {
  // "nearby tickets"
  var values = lines[i].split(",");
  var valid = true;
  for(var v=0; valid && v<values.length; v++) {
    var validValue = false;
    for(var f=0; !validValue && valid && f<fields.length; f++) {
      for(var r=0; !validValue && valid && r<fields[f].ranges.length; r++) {
        var range = fields[f].ranges[r];
        var value = parseInt(values[v]);
        if(value>=range[0] && value<=range[1]) {
          validValue = true;
        }
      }
    }
    if(!validValue) {
      total+=parseInt(values[v]);
      valid = false;
    }
  }
}

log("result: "+total);
