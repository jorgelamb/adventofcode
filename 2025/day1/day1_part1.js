var lines = input.split("\n");

var result = 0;
let position = 50;

for(let i=0; i<lines.length; i++) {
  let moveRight = lines[i].charAt(0) == 'R';
  let number = lines[i].substring(1)-0;
  position += (moveRight ? number : -number);
  position = position % 100;
  if(position==0) {
    result++;
  }
}

log(`result: ${result}`);
