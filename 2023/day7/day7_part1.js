var lines = input.split("\n");

function getHand(cards) {
  var cardList = cards.split("");
  var counted = cardList.reduce((counts, card) => {
    counts[card] = (counts[card] || 0) + 1;
    return counts;
  }, {});
  var sorted = Object.values(counted).sort().reverse();
  if(sorted[0]==5) {
    return 6; // repoker
  } else if(sorted[0]==4) {
    return 5; // poker
  } else if(sorted[0]==3 && sorted[1]==2) {
    return 4; // full
  } else if(sorted[0]==3) {
    return 3; // three
  } else if(sorted[0]==2 && sorted[1]==2) {
    return 2; // two pairs
  } else if(sorted[0]==2) {
    return 1; // pair
  } else {
    return 0;
  }
}

function getCardValue(c) {
  return "AKQJT98765432".split("").reverse().indexOf(c);
}

var hands = lines.map(l => {
  return {
    cards: l.split(" ")[0],
    bid: parseInt(l.split(" ")[1]),
    hand: getHand(l.split(" ")[0]),
    individualCards: l.split(" ")[0].split("").map(getCardValue)
  }
});

var sortedHands = hands.sort((a, b) => {
  if(a.hand>b.hand) {
    return -1;
  } else if(a.hand<b.hand) {
    return 1;
  }
  for(var i=0; i<a.individualCards.length; i++) {
    if(a.individualCards[i]>b.individualCards[i]) {
      return -1;
    } else if(a.individualCards[i]<b.individualCards[i]) {
      return 1;
    }
  }
  return 0;
});

var ranked = sortedHands.map((h, idx) => {
  h.rank = sortedHands.length-idx;
  return h;
});

//log(ranked);

var result = ranked.map(h => h.rank*h.bid).reduce((a, b) => a+b, 0);
log(`result: ${result}`);
