var code = input.split("\n").map(inst => inst.split(" ")).map(row => row.concat([false]));

for(i=0; i<code.length; i++) {
	if(code[i][0]=="acc") continue;
	var acc = 0;
	var p = 0;
	for(j=0; j<code.length; j++) { code[j][2] = false; }
	while(p<code.length && !code[p][2]) {
		var action = code[p][0]; if(p==i) { action = (action == "jmp" ? "nop" : "jmp")}
		switch(action) {
    			case "acc": code[p][2] = true; acc += parseInt(code[p][1]); p++; break;
    			case "jmp": code[p][2] = true; p += parseInt(code[p][1]); break;
    			case "nop": code[p][2] = true; p++; break;
		}
	}
	if(p>=code.length) {
    		console.log("i: "+i+"\tp: "+p+"\tacc: "+acc+"\tcode[p]: "+code[p]);
    		console.log(acc);
    		//break;
	}
}
