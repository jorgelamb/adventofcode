var a = input.split("\n");
var diff=true;
var total = 0;
while(diff) {
  //log(a.join("\n"));
  diff=false;
  var o = [];
  for(var i=0; i<a.length; i++) {
    o[i] = "";
    for(var j=0; j<a[0].length; j++) {
      var c=0;
      var l=0;
      var occ=0;
      for(var ii=-1; ii<=1; ii++) {
        for(jj=-1; jj<=1; jj++) {
          if(i+ii>=0 && i+ii<a.length && j+jj>=0 && j+jj<a[0].length && (ii!=0 || jj!=0)) {
            switch (a[i+ii].charAt(j+jj)) {
              case 'L': l++; break;
              case '#': occ++; break;
            } // switch
          } // if (bounds)
        } // jj
      } // ii
      if(a[i].charAt(j)=='.') {
        o[i] += '.';
      } else if(occ>=4) {
        o[i] += 'L';
      } else if(occ==0) {
        o[i] += '#';
      }else {
        o[i] += a[i].charAt(j);
      } // if/else if
    } // j
  } // i
  total=0;
  for(var i=0; i<a.length; i++) {
    for(var j=0; j<a[0].length; j++) {
      if(a[i].charAt(j)!=o[i].charAt(j)) {
        diff=true;
      }
      if(o[i].charAt(j)=='#') {
        total++;
      }
    } // j (diff)
  } // i (diff)
  a = o;
} // while
log(o);

log("result: " +total);
