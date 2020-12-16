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
  fields.push({name: name, ranges: ranges, possible: [], index: -1});
}

i++;
var yourTicket = "";
for( ; lines[i]!=""; i++) {
  // "your ticket"
  yourTicket = lines[i].split(",").map(v => parseInt(v));
}

var total = 0;
var validTickets = [];

i++;
i++;
for( ; i<lines.length && lines[i]!=""; i++) {
  // "nearby tickets"
  var values = lines[i].split(",").map(v => parseInt(v));
  var valid = true;
  for(var v=0; valid && v<values.length; v++) {
    var value = values[v];
    var validValue = false;
    for(var f=0; !validValue && valid && f<fields.length; f++) {
      for(var r=0; !validValue && valid && r<fields[f].ranges.length; r++) {
        var range = fields[f].ranges[r];
        if(value>=range[0] && value<=range[1]) {
          validValue = true;
        }
      }
    }
    if(!validValue) {
      total+=values[v];
      valid = false;
    }
  }
  if(valid) {
    validTickets.push(values);
  }
}

var departures = [];
for(var f=0; f<fields.length; f++) {
  for(var element=0; element<validTickets[0].length; element++) {
    var correctField = true;
    for(var vt=0; correctField && vt<validTickets.length; vt++) {
      var value = validTickets[vt][element];
      var validValue = false;
      for(var r=0; r<fields[f].ranges.length; r++) {
        var range = fields[f].ranges[r];
        if(value>=range[0] && value<=range[1]) {
          validValue = true;
        }
      }
      if(!validValue) {
        correctField = false;
      }
    }
    if(correctField) {
      fields[f].possible.push(element);
    }
  }
}

var updated = true;
while(updated) {
  updated = false;
  for(var f=0; f<fields.length; f++) {
    if(fields[f].index==-1) {
      if(fields[f].possible.length==1) {
        fields[f].index = fields[f].possible[0];
        if(fields[f].name.startsWith("departure")) {
          departures.push(fields[f].possible[0]);
        }
        updated = true;
        for(var otherField=0; otherField<fields.length; otherField++) {
          fields[otherField].possible = fields[otherField].possible.filter(e => e!=fields[f].index);
        }
      }
    }
  }
}

var total = departures.map(e => yourTicket[e]).reduce((acc, cur) => acc*cur, 1);
log("result: "+total);
