input.split(",").map((row, idx) => { return row.charAt((idx*3) % row.length)=="#"}).reduce((acc, current) => { return acc + (current? 1 : 0); })
