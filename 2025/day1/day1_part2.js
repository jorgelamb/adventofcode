var lines = input.split("\n");

var result = 0;
let position = 50;

for(let i=0; i<lines.length; i++) {
  let moveRight = lines[i].charAt(0) == 'R';
  let number = lines[i].substring(1)-0;
  result += Math.floor(Math.abs(number)/100);
  let newPosition = position;
  for(let p=0; p<Math.abs(number)%100; p++) {
    newPosition += (moveRight ? 1 : -1);
    newPosition = newPosition % 100;
    if(newPosition == 0) {
      result++;
    }
  }
  position = (newPosition + 100) % 100;
}

log(`result: ${result}`);
