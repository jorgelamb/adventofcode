var lines = input.split("\n");

var mem = {};
var mask = "";

lines.forEach(l => {
  var parts = l.split(" = ");
  if(parts[0]=="mask") {
    mask = parts[1];
  } else {
    address = BigInt(parts[0].match("mem\\[([0-9]*)\\]")[1]);

    var masks = [mask];
    var size = masks.length;
    var oldSize = -1;
    while(size != oldSize) {
      // 0 ==> unchanged
      // 1 ==> 1
      // a ==> 0
      // b ==> 1
      var replaced = masks.map(e => {
        if(e.indexOf("X")<0) {
          return [e];
        } else {
          return [e.replace(/X/, "a"), e.replace(/X/, "b")];
        }
      });
      masks = replaced.reduce((acc, cur) => acc.concat(cur), []);
      oldSize = size;
      size = masks.length;
    }

    n = BigInt(parseInt(parts[1]));
    masks.forEach(mask => {
console.log("AndMask: "+mask.replace(/0/g, "1").replace(/b/g, "1").replace(/a/g, "0"));
      andMask = BigInt(parseInt(mask.replace(/0/g, "1").replace(/b/g, "1").replace(/a/g, "0"), 2));
      orMask = BigInt(parseInt(mask.replace(/b/g, "1").replace(/a/g, "0"), 2));
      mem[(address & andMask) | orMask] = n;
    });
  }
});

var total = BigInt(0);
for(i in mem) {
  total += mem[i];
}
log("total: "+total);
