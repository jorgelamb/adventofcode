var lines = input.split("\n");

var modulo = 20201227;
var subject = 7;
var cardPublic = parseInt(lines[0]);
var doorPublic = parseInt(lines[1]);

var cardLoop = -1;
var doorLoop = -1;

var i=1;

for(var loop = 1; cardLoop == -1 || doorLoop == -1; loop++) {
  i = (i*subject) % modulo;
  if(i == cardPublic) {
    cardLoop = loop;
  }
  if(i == doorPublic) {
    doorLoop = loop;
  }
}

i = 1;
for(var l=0; l<doorLoop; l++) {
  i = (i*cardPublic)%modulo;  
}
log("encryptionKey: "+i);
