var x=0;
var y=0;
var wx = 10;
var wy = 1;
var d='e';
input.split("\n").forEach(i => {
 var l = i.charAt(0);
 var n = parseInt(i.substring(1));
 switch (l) {
  case 'N': wy+= n; break;
  case 'S': wy -= n; break;
  case 'E': wx += n; break;
  case 'W': wx -= n; break;
  case 'R':
   for(var i=0; i<n/90; i++) {
    var tmp = wx;
    wx = wy;
    wy = -tmp;
   }
   break;
  case 'L':
   for(var i=0; i<n/90; i++) {
    var tmp = wx;
    wx = -wy;
    wy = tmp;
   }
   break;
  case 'F':
   x += n*wx;
   y += n*wy;
   break;
 } // switch
});
log("result: "+(Math.abs(x)+Math.abs(y)));
