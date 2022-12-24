var lines = input.split("\n");

var list = lines.map((e, idx) => `${parseInt(e)*811589153}_${idx}`);
var originalList = lines.map((e, idx) => `${parseInt(e)*811589153}_${idx}`);

function move(a, i) {
  var element = a[i];
  var number = parseInt(element.split("_")[0]);
  if(number == 0) {
    return;
  }
  
  var idx = a.indexOf(element);
  a.splice(idx, 1);
  var newIdx = (((idx+number) % (a.length))+(a.length)) % (a.length);
  a.splice(newIdx, 0, element);
}

for(var round=0; round<10; round++) {
  for(var n=0; n<originalList.length; n++) {
    var element = originalList[n];
  
    move(list, list.indexOf(element));
  }
}

var idx0 = list.map(e => parseInt(e.split("_")[0])).indexOf(0);

var n1000 = parseInt(list[(idx0+1000)%list.length].split("_")[0]);
var n2000 = parseInt(list[(idx0+2000)%list.length].split("_")[0]);
var n3000 = parseInt(list[(idx0+3000)%list.length].split("_")[0]);

var result = n1000+n2000+n3000;
log(`result: ${result}`);
