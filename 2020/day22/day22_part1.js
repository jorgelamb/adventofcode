var playerInputs = input.split("\n\n");

var players = playerInputs.map(i => i.split("\n").splice(1).map(v => parseInt(v)));

while(players[0].length != 0 && players[1].length != 0) {
  var cardP1 = players[0].splice(0, 1);
  var cardP2 = players[1].splice(0, 1);

  if(cardP1[0] > cardP2[0]) {
    players[0] = players[0].concat(cardP1).concat(cardP2);
  } else {
    players[1] = players[1].concat(cardP2).concat(cardP1);
  }
}

var total = players[0].concat(players[1]).reverse().map((cur, idx) => cur*(idx+1)).reduce((acc, cur) => acc+cur, 0);

log("result: "+total);
