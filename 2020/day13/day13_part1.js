var schedule = input.split("\n");
var timestamp = parseInt(schedule[0]);
var buses = schedule[1].split(",").filter(b => b!='x').map(b => parseInt(b));
var result = buses.map(b => { return {bus: b, delay: Math.floor(timestamp/b)*b+b-timestamp}}).reduce((acc, cur) => { if(cur.delay<acc.delay) { return cur; } else { return acc; }}, {bus: -1, delay: 99999999});
log("result: "+(result.bus * result.delay));
