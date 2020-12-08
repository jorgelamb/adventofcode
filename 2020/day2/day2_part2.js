var count = 0;
input.split(",").forEach(r => { var rElements = r.split(" "); var numbers = rElements[0].split("-"); var min = numbers[0]; var max = numbers[1]; var letter = rElements[1].charAt(0); var c = 0; if((rElements[2].charAt(min-1)==letter) != (rElements[2].charAt(max-1)==letter)) {count++;} });
console.log(count);
