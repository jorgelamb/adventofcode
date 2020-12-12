var x=0;
var y=0;
var d='e';
var directions = ['e', 's', 'w', 'n'];
input.split("\n").forEach(i => {
 var l = i.charAt(0);
 var n = parseInt(i.substring(1));
 switch (l) {
  case 'N': y+= n; break;
  case 'S': y -= n; break;
  case 'E': x += n; break;
  case 'W': x -= n; break;
  case 'R':
  case 'L':
   d = directions[(((directions.indexOf(d)+((l=='R'?1:0
-1)*n/90))%4)+4)%4]; break;
  case 'F':
   switch (d) {
    case 'e': x+=n; break;
    case 's': y-=n; break;
    case 'w': x-=n; break;
    case 'n': y+=n; break;
   }
   break;
 } // switch
});
log("result: "+(Math.abs(x)+Math.abs(y)));
