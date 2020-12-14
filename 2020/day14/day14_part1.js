var lines = input.split("\n");

var mem = {};
var andMask = BigInt(0);
var orMask = BigInt(0);

lines.forEach(l => {
  var parts = l.split(" = ");
  if(parts[0]=="mask") {
    andMask = BigInt(parseInt(parts[1].replace(/X/g, "1"), 2));
    orMask = BigInt(parseInt(parts[1].replace(/X/g, "0"), 2));
  } else {
    address = parts[0].match("mem\\[([0-9]*)\\]")[1];
    n = BigInt(parseInt(parts[1]));
    mem[address] = (n & andMask) | orMask;
  }
});

var total = BigInt(0);
for(i in mem) {
  total += mem[i];
}
log("total: "+total);
