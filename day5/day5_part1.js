input.split(",").map(s => s.replace(/[BR]/g, "1").replace(/[FL]/g, "0")).map(s => parseInt(s, 2)).reduce((acc, current) => Math.max(acc, current), 0)
