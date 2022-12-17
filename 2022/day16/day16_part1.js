const TIME = 30;

var lines = input.split("\n");

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
        if(!distances[v.id][v3] || distances[v.id][v3] > distances[v2][v3]+1) {
          distances[v.id][v3] = distances[v2][v3]+1;
          updated = true;
        }
      });
    });
  });
}

var allValvesWithFlow = Object.values(valves).filter(v => v.flow>0).map(v => v.id).join(",");

var pending = ["0_AA"];
var best = {};
best["0_AA"] = 0;
var max = 0;

while(pending.length>0) {
  var current = pending.shift();
  
  var currentTime = parseInt(current.split("_")[0]);
  var currentValve = current.split("_")[1];
  var currentOpenValves = (current.split("_")[2] || "").split(",").filter(e => e);
  var currentOpenFlow = currentOpenValves.map(v => valves[v].flow).reduce((a, b) => a+b, 0);

  var totalIfNoMoreOpenValves = best[current] + (TIME-currentTime)*currentOpenFlow;
  if(totalIfNoMoreOpenValves > max) {
    max = totalIfNoMoreOpenValves;
  }

  var pendingValves = allValvesWithFlow.split(",").filter(v => currentOpenValves.indexOf(v)<0);

  pendingValves.forEach(v => {
    var distanceToValve = distances[currentValve][v];
    if(!distanceToValve) { log(`can't get there ${currentValve} ${v}`); }
    var newTime = currentTime+distanceToValve+1;

    if(newTime < TIME) {
      var newState = `${newTime}_${v}_${currentOpenValves.concat(v).sort().join(",")}`;
      var newFlow = best[current]+currentOpenFlow*(distanceToValve+1);
      if(!best[newState] || best[newState] < newFlow) {
        best[newState] = newFlow;
        if(pending.indexOf(newState)<0) {
          pending.push(newState);
        }
      }
    }
  });
}

log(`result: ${max}`);
