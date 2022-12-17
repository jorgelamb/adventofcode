const GOAL = "...........ABCDABCDABCDABCD";
const CORRIDOR_LENGTH = "...........".length;
const ROOMS = 4;

var lines = input.replaceAll(" ", "").replaceAll("#", "").replaceAll("#", "").replaceAll("\n", "");

var distances = {};
distances[lines] = 0;

var pending = [];
pending.push(lines);

function isAmphipod(c) {
  return c!=".";
}

function isCorridor(position) {
  return position < CORRIDOR_LENGTH;
}

function getRoom(position) {
  return (position-CORRIDOR_LENGTH)%ROOMS;
}

function getDepth(position) {
  return Math.floor((position-CORRIDOR_LENGTH)/ROOMS);
}

function getRoomPosition(room, depth) {
  return CORRIDOR_LENGTH+ROOMS*depth+room;
}

function wantsToExit(state, room, depth) {
  var roomContents = getRoomContents(state, room);
  for(var d=depth; d<roomContents.length; d++) {
    var neighbour = roomContents[d];
    if(getDestination(neighbour)!=room) {
      return true;
    }
  }
  return false;
}

function canExitRoom(state, room, depth) {
  if(!wantsToExit(state, room, depth)) {
    return false;
  }
  var roomContents = getRoomContents(state, room);
  for(var d=0; d<depth; d++) {
    var neighbour = roomContents[d];
    if(isAmphipod(neighbour)) {
      return false;
    }
  }
  return true;
}

function getDestination(amphipod) {
  switch(amphipod) {
    case "A": return 0;
    case "B": return 1;
    case "C": return 2;
    case "D": return 3;
  }
}

function getCost(amphipod) {
  switch(amphipod) {
    case "A": return 1;
    case "B": return 10;
    case "C": return 100;
    case "D": return 1000;
  }
}

function getRoomContents(state, room) {
  var temp = state.split("");
  return temp.filter((e, idx) => idx >= CORRIDOR_LENGTH && getRoom(idx)==room);
}

function getMoveToRoom(state, position, amphipod) {
  var room = getDestination(amphipod);
  var direction = (position < 2*room+2 ? 1 : -1);
  for(var i=position+direction; i!=2*room+2; i+=direction) {
    if(isAmphipod(state.charAt(i))) {
      return false;
    }
  }
  var newState = state.split("");
  var roomContents = newState.filter((e, idx) => idx >= CORRIDOR_LENGTH && getRoom(idx)==room);
  if(roomContents.filter(e => e!="." && e!=amphipod).length>0) {
    //log("someone else");
    return false;
  }
  var depth = roomContents.lastIndexOf(".");
  var moves = Math.abs(2*room+2 - position)+depth+1;
  newState[position] = ".";
  newState[getRoomPosition(room, depth)] = amphipod;
  var move = [newState.join(""), getCost(amphipod)*moves];
  //log(`${move[0]}, ${move[1]}`);
  return move;
}


function canStopAt(position) {
  return position<2 || position >= 9 || (position%2)==1;
}

function getMovesExitRoom(state, room, depth) {
  var corridorPositions = [];
  
  for(var i=2*room+2-1; i>=0 && !isAmphipod(state.charAt(i)); i--) {
    if(canStopAt(i)) {
      corridorPositions.push(i);
    }
  }
  for(var i=2*room+2+1; i<CORRIDOR_LENGTH && !isAmphipod(state.charAt(i)); i++) {
    if(canStopAt(i)) {
      corridorPositions.push(i);
    }
  }

  return corridorPositions.map(corridorPosition => {
    var newState = state.split("");
    var moves = Math.abs(2*room+2 - corridorPosition)+depth+1;
    var amphipod = newState[getRoomPosition(room, depth)];
    newState[getRoomPosition(room, depth)] = ".";
    newState[corridorPosition] = amphipod;
    var move = [newState.join(""), getCost(amphipod)*moves];
    //log(`${move[0]}, ${move[1]}`);
    return move;
  });
}

var count = 0;
var best = -1;
while(pending.length > 0) {
  var current = pending.shift();
  //log(current);
  
  for(var i=0; i<current.length; i++) {
    var amphipod = current.charAt(i);
    if(isAmphipod(amphipod)) {
      if(isCorridor(i)) {
        var move = getMoveToRoom(current, i, amphipod);
        if(move) {
          var newState = move[0];
          var cost = move[1];
          if(!distances[newState] || distances[current]+cost<distances[newState]) {
            distances[newState] = distances[current]+cost;
            if(pending.indexOf(newState)<0) {
              pending.push(newState);
            }
          }
        }
      } else {
        var room = getRoom(i);
        var depth = getDepth(i);
        
        if(canExitRoom(current, room, depth)) {
          //log(`can exit: ${amphipod}`);
          var moves = getMovesExitRoom(current, room, depth);
          moves.forEach(move => {
            var newState = move[0];
            var cost = move[1];
            
            if(!distances[newState] || distances[current]+cost<distances[newState]) {
              distances[newState] = distances[current]+cost;
              if(pending.indexOf(newState)<0) {
                pending.push(newState);
              }
            }
          });
        }
      }
    }
  }
  
  pending = pending.sort((a, b) => distances[a]-distances[b]);
}

var result = distances[GOAL];
log(`result: ${result}`);
