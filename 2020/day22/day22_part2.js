var playerInputs = input.split("\n\n");

var players = playerInputs.map(i => i.split("\n").splice(1).map(v => parseInt(v)));

var result = recursiveGame(players[0], players[1]);
var total = result[result[0]+1].reverse().map((cur, idx) => cur*(idx+1)).reduce((acc, cur) => acc+cur, 0);

log("result: "+total);

function recursiveGame(p0, p1) {
  var previous = {};
  while(true) {
    if(previous[p0.join("_")+"__"+p1.join("_")]) {
      return [0, p0, p1];
    }
    previous[p0.join("_")+"__"+p1.join("_")] = true;
    
    var cardP0 = p0.splice(0, 1);
    var cardP1 = p1.splice(0, 1);

    if(p0.length >= cardP0[0] && p1.length >= cardP1[0]) {
      var copyCards0 = JSON.parse(JSON.stringify(p0));
      var copyCards1 = JSON.parse(JSON.stringify(p1));
      copyCards0 = copyCards0.splice(0, cardP0[0]);
      copyCards1 = copyCards1.splice(0, cardP1[0]);
      var winner = recursiveGame(copyCards0, copyCards1, depth+1)[0];
      if(winner == 0) {
        p0 = p0.concat(cardP0).concat(cardP1);
      } else {
        p1 = p1.concat(cardP1).concat(cardP0);
      }
    } else {
      if(cardP0[0] > cardP1[0]) {
        p0 = p0.concat(cardP0).concat(cardP1);
      } else {
        p1 = p1.concat(cardP1).concat(cardP0);
      }
    }
    if(p0.length == 0) {
      return [1, p0, p1];
    }
    if(p1.length == 0) {
      return [0, p0, p1];
    }
  }
}
