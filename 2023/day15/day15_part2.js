var lines = input.split(",");

function hash(s) {
  var current = 0;
  
  for(var i=0; i<s.length; i++) {
    current += s.charCodeAt(i);
    current *= 17;
    current %= 256;
  }
  return current;
}

var boxes = Array(256);
for(var i=0; i<boxes.length; i++) {
  boxes[i] = [];
}

lines.map(l => {
  var matches = l.match(/([a-z]*)([-=])([0-9]*)/)
  var label = matches[1];
  var operation = matches[2];
  var focus = parseInt(matches[3]);
  var h = hash(label);
  var lens = {label, focus};
  
  switch(operation) {
    case "-":
      boxes[h] = boxes[h].filter(e => e.label != label);
      break;
    case "=":
      var idx = boxes[h].findIndex(e => e.label == label);
      if(idx<0) {
        boxes[h].push(lens);
      } else {
        boxes[h][idx] = lens;
      }
      break;
  }
});

var result = boxes.map((box, boxIdx) => {
  var boxPower = box.map((boxContents, boxContentsIdx) => (boxIdx+1)*(boxContentsIdx+1)*boxContents.focus).reduce((a, b) => a+b, 0);
  return boxPower;
}).reduce((a, b) => a+b, 0);

log(`result: ${result}`);
