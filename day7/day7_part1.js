var mappings = input.split(".\n").map(description => { var bagAndContents = description.split(" bags contain "); bagAndContents[1] = bagAndContents[1].split(", ").map(content => content.substring(content.indexOf(" ")+1)); return bagAndContents; }).reduce((acc, curr) => { acc[curr[0]] = curr[1]; return acc; }, {});


var total = 0;
for(i in mappings) { var contains = false; var pending = [].concat(mappings[i]); while(!contains && pending.length>0) { var bag = pending.pop().match(/([a-z ]*) bag(s?)/)[1]; if(bag=="shiny gold") { contains = true; } else { pending = pending.concat(mappings[bag] || []); } } if(contains) { total++; } } console.log(total);
