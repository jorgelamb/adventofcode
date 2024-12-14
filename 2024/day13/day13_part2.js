var fs = require('fs');
const BigNumber = require('bignumber.js');

function log(o) {
  console.log(JSON.stringify(o));
}

const TEST = false;

const FILENAME = process.argv[2];
fs.readFile(FILENAME, 'utf8', function(err, data) {
  if (err) throw err;
  var input = data.trim();


var blocks = input.split("\n\n");

var result = 0;
blocks.forEach(block => {
  var lines = block.split("\n");
  var a = [...lines[0].matchAll("[0-9]+")].map(e => new BigNumber(e[0]));
  var b = [...lines[1].matchAll("[0-9]+")].map(e => new BigNumber(e[0]));
  var prize = [...lines[2].matchAll("[0-9]+")].map(e => new BigNumber(e[0]).plus(10000000000000));
  
  var nB = ( prize[1].minus(prize[0].times(a[1]).dividedBy(a[0]) ) ) .dividedBy ( (b[1] .minus( b[0].times(a[1]).dividedBy(a[0])) ) );
  var nA = (prize[0] .minus( nB .times( b[0]) )) .dividedBy( a[0] );

  nA = Math.floor(nA);
  nB = Math.floor(nB);
  if(prize[0] == nB*b[0] + nA*a[0] && prize[1] == nB*b[1] + nA*a[1] && nA >= 0 && nB >= 0) {
    result += 3*nA + nB;
    return;
  }
  return;
});

log(`result: ${result}`);


});
