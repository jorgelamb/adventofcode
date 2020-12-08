var code = input.split("\n").map(inst => inst.split(" ")).map(row => row.concat([false]));

var acc = 0;
var p = 0;
while(!code[p][2]) {
	switch(code[p][0]) {
		case "acc": acc += parseInt(code[p][1]); p++; break;
		case "jmp": p += parseInt(code[p][1]); break;
		case "nop": p++; break;
	}
}
console.log(acc);
