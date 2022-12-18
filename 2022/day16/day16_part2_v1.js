const TIME = 26;

var lines = input.split("\n");

function addValves(arr, a, b) {
  if(a && arr.indexOf(a)<0) {
    arr = arr.concat([a]);
  }
  if(b && arr.indexOf(b)<0) {
    arr = arr.concat([b]);
  }
  return arr.sort();
}

var valves = {};
lines.forEach(l => {
  var matches = [...l.matchAll(/Valve ([A-Z]+) has flow rate=([0-9]+); tunnel(s?) lead(s?) to valve(s?) (.*)/g)][0];
  valves[matches[1]] = {
    id: matches[1],
    flow: parseInt(matches[2]),
    neighbours: matches[matches.length-1].split(", ")
  };
});

var distances = {};
Object.values(valves).forEach(v => {
  distances[v.id] = {};
  distances[v.id][v.id] = 0;
  v.neighbours.forEach(v2 => {
    distances[v.id][v2] = 1;
  });
});
var updated = true;
while(updated) {
  updated = false;
  Object.values(valves).forEach(v => {
    v.neighbours.forEach(v2 => {
      Object.keys(distances[v2]).forEach(v3 => {
        if(typeof distances[v.id][v3] === 'undefined' || distances[v.id][v3] > distances[v2][v3]+1) {
          distances[v.id][v3] = distances[v2][v3]+1;
          updated = true;
        }
      });
    });
  });
}

var allValvesWithFlow = Object.values(valves).filter(v => v.flow>0).map(v => v.id).join(",");

var pending = ["0_AA,AA"];
var best = {};
best["0_AA,AA"] = 0;
var max = 0;

while(pending.length>0) {
  var current = pending.shift();
  var currentTime = parseInt(current.split("_")[0]);
  var currentValve = current.split("_")[1].split(",");
  var currentOpenValves = (current.split("_")[2] || "").split(",").filter(e => e);
  var currentOpenFlow = currentOpenValves.map(v => valves[v].flow).reduce((a, b) => a+b, 0);

  var totalIfNoMoreOpenValves = best[current] + (TIME-currentTime)*currentOpenFlow;
  if(totalIfNoMoreOpenValves > max) {
    max = totalIfNoMoreOpenValves;
  }

  var pendingValves = allValvesWithFlow.split(",").filter(v => currentOpenValves.indexOf(v)<0);

  var canMove = currentValve.map(e => e.indexOf(".")<0);
  if(canMove[0] && canMove[1]) {
    if(currentValve[0]>currentValve[1]) {
      var newState = `${currentTime}_${currentValve[1]},${currentValve[0]}_${currentOpenValves.join(",")}`;
      var newFlow = best[current];
      if(!best[newState] || best[newState] < newFlow) {
        best[newState] = newFlow;
        if(pending.indexOf(newState)<0) {
          pending.push(newState);
        }
      }
    } else {
      var destinationForOther = currentValve[1].split(".")[0];
      pendingValves.forEach(v => {
        var distanceToValve = distances[currentValve[0]][v];
        if(!distanceToValve) { log(`can't get there ${currentValve[0]} ${v}`); }
        var newTime = currentTime+distanceToValve+1;

        if(newTime < TIME) {
          var newState = `${currentTime}_${currentValve[1]},${v}.${distanceToValve+1}_${currentOpenValves.join(",")}`;
          var newFlow = best[current];
          if(!best[newState] || best[newState] < newFlow) {
            best[newState] = newFlow;
            if(pending.indexOf(newState)<0) {
              pending.push(newState);
            }
          }
        }
      });
    }
  } else if(canMove[0]) {
    var destinationForOther = currentValve[1].split(".")[0];
    var remainingTimeForOther = parseInt(currentValve[1].split(".")[1]);
    pendingValves.forEach(v => {
      var distanceToValve = distances[currentValve[0]][v];
      if(!distanceToValve) { log(`can't get there ${currentValve[0]} ${v}`); }
      if(v==destinationForOther && distanceToValve+1>=remainingTimeForOther) {
        return;
      }
      if(distanceToValve+1 == remainingTimeForOther) {
        var newTime = currentTime+distanceToValve+1;
        if(newTime < TIME) {
          var newState = `${newTime}_${v},${destinationForOther}_${addValves(currentOpenValves, v, destinationForOther)}`;
          var newFlow = best[current] + currentOpenFlow*(newTime-currentTime);
          if(!best[newState] || best[newState] < newFlow) {
            best[newState] = newFlow;
            if(pending.indexOf(newState)<0) {
              pending.push(newState);
            }
          }
        }
      } else if(distanceToValve+1 > remainingTimeForOther) {
        var newTime = currentTime+remainingTimeForOther;
        if(newTime < TIME) {
          var newState = `${newTime}_${destinationForOther},${v}.${distanceToValve+1-remainingTimeForOther}_${addValves(currentOpenValves, destinationForOther)}`;
          var newFlow = best[current] + currentOpenFlow*(newTime-currentTime);
          if(!best[newState] || best[newState] < newFlow) {
            best[newState] = newFlow;
            if(pending.indexOf(newState)<0) {
              pending.push(newState);
            }
          }
        }
      } else if(distanceToValve+1 < remainingTimeForOther) {
        var newTime = currentTime+distanceToValve+1;
        if(newTime < TIME) {
          var newState = `${newTime}_${v},${destinationForOther}.${remainingTimeForOther-(distanceToValve+1)}_${addValves(currentOpenValves, v)}`;
          var newFlow = best[current] + currentOpenFlow*(newTime-currentTime);
          if(!best[newState] || best[newState] < newFlow) {
            best[newState] = newFlow;
            if(pending.indexOf(newState)<0) {
              pending.push(newState);
            }
          }
        }
      }
    });
  }

  //pending = pending.sort((a, b) => best[a]-best[b]);
}

log(`result: ${max}`);
