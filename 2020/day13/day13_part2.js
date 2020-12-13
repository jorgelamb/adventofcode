var schedule = input.split("\n");
var timestamp = parseInt(schedule[0]);
var buses = schedule[1].split(",");
var t = buses.map((b, idx) => { return { bus: b, idx: idx }}).filter(b => b.bus!='x');
var mcm = t.reduce((acc, cur) => acc * cur.bus, 1);
var mcmBigInt = BigInt(mcm);

var result = t.map(b => {
  var q = BigInt(mcm/b.bus);
  var a = BigInt(b.bus-b.idx);
  var h = -1;
  for(var i=1; i<b.bus; i++) {
    if((BigInt(i)*q)%BigInt(b.bus) == 1) {
      h = BigInt(i);
      break;
    }
  }
  return ((( ((a%mcmBigInt)+mcmBigInt)%mcmBigInt)*(q%mcmBigInt))%mcmBigInt*h)%mcmBigInt;
}).reduce((acc, cur) => {
  return (acc+cur)%mcmBigInt;
}, BigInt(0));
log(result%mcmBigInt);
