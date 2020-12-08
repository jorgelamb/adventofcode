var mappings = input.split(".\n").map(description => { var bagAndContents = description.split(" bags contain "); bagAndContents[1] = bagAndContents[1].split(", ").map(content => content.match(/([0-9]*) ([a-z ]*) bag(s?)/)); return bagAndContents; }).reduce((acc, curr) => { acc[curr[0]] = curr[1]; return acc; }, {});

var total = 0; var pending = []; pending.push([1, "shiny gold"]); while(pending.length>0) { current = pending.pop(); console.log(current[1]); if(current[1]=="other") {  } else {  total += current[0]; console.log(JSON.stringify(current)); console.log(mappings[current[1]]); pending = pending.concat(mappings[current[1]].map(a => [current[0]*(a[1]==""?1:a[1]), a[2]]));  } } console.log(total-1);

