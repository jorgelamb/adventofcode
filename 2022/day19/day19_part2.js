var fs = require('fs');

function log(o) {
  console.log(JSON.stringify(o));
}

const TEST = false;

const FILENAME = (TEST ? 'test.txt' : 'input.txt');
fs.readFile(FILENAME, 'utf8', function(err, data) {
  if (err) throw err;
  var input = data.trim();




const TIME = 32;
const NONE = -1;

var lines = input.split("\n");

var blueprints = lines.map((l, idx) => [l, idx]).filter(e => e[1]<3).map(e => e[0]).map(l => {
  //var ints = [...l.matchAll(/(\d+)/g)];
  var parts = l.split(" ");
  var ints = [[parts[1]], [parts[6]], [parts[12]], [parts[18]], [parts[21]], [parts[27]], [parts[30]]];
  var blueprint = {
    id: parseInt(ints[0][0]),
    costs: [
      [parseInt(ints[1][0]), 0, 0, 0],
      [parseInt(ints[2][0]), 0, 0, 0],
      [parseInt(ints[3][0]), parseInt(ints[4][0]), 0, 0],
      [parseInt(ints[5][0]), 0, parseInt(ints[6][0]), 0]
    ]
  }
  return blueprint;
});

log(blueprints);


var count = 0;
function workOnNewRobot(blueprint, robot, robots, resources, time, justBuilt, max) {
  count++;
  if(count%1000000000==0) { console.log(count); }
  //console.log(`building ${robot}, have ${robots} ${resources}. t=${time}`);
  if(time>TIME) {
    //log(resources);
    return resources[3];
  }

  if(robot<3 && max[robot]<=robots[robot]) {
    //log(`enough is enough: have ${robots[robot]} of ${robot}, max is ${max[robot]}`);
    return -1;
  }

  for(var i=0; i<3; i++) {
    if(blueprint.costs[robot][i]>0 && robots[i]==0) {
      //log(`can't build ${robot} yet`);
      return -1;
    }
  }
  for(var i=0; i<4; i++) {
    resources[i] += robots[i] - (justBuilt==i ? 1 : 0);
  }

  if(time==TIME) {
    return resources[3];
  }

  var canBuild = true;
  for(var i=0; i<4; i++) {
    if(resources[i] < blueprint.costs[robot][i]) {
      canBuild = false;
    }
  }

  if(!canBuild) {
    return workOnNewRobot(blueprint, robot, [...robots], [...resources], time+1, NONE, max);
  } else {
    for(var i=0; i<4; i++) {
      resources[i] -= blueprint.costs[robot][i];
    }
    robots[robot]++;
  }
  var best = 0;
  for(var newRobot=0; newRobot<4; newRobot++) {
    best = Math.max(best, workOnNewRobot(blueprint, newRobot, [...robots], [...resources], time+1, robot, max));
  }
  return best;
}

var qualities = blueprints.map(blueprint => {
  var robots = [ 1, 0, 0, 0 ];
  var resources = [ 0, 0, 0, 0 ];
  var time = 0;
  var max = [ 0, 0, 0, 0 ];
  blueprint.costs.forEach(costs => {
    for(var i=0; i<4; i++) {
      max[i] = Math.max(costs[i], max[i]);
    }
  });

  var best = 0;
  for(var robot=0; robot<4; robot++) {
    best = Math.max(best, workOnNewRobot(blueprint, robot, [...robots], [...resources], time+1, NONE, max));
  }
  log(`blueprint: ${blueprint.id} ${best}`);
  return best;
});

var result = qualities.reduce((a, b) => a*b, 1);
log(`result: ${result}`);

}); // read file
