## github pages

Test

<script>
function clearLog(s) {
	var l = document.getElementById("log");
	l.value = "";
}

function log(s) {
	var l = document.getElementById("log");
	l.value += s + "\n";
}

function runCode(test) {
	var input = document.getElementById((test ? "test_" : "")+"input").value;
	var code = document.getElementById("code").value;

	eval(code);
}
</script>

<select id="year">
<script>
	for(i=2015; i!=(new Date()).getFullYear()+1; i++) {
		document.write("<option>"+i+"</option>");
	}
</script>
</select>
<select id="day">
<script>
	for(i=1; i!=26; i++) {
		document.write("<option>"+i+"</option>");
	}
</script>
</select>
<select id="problem">
	<option>1</option>
	<option>2</option>
</select>

Input
<textarea id="input">abc
def</textarea>

Test input
<textarea id="test_input"></textarea>

Code
<textarea id="code">log(input.split("\n")[0]);</textarea>

Log
<textarea id="log"></textarea>

<button onclick="runCode(true)">Evaluate test input</button>
<button onclick="runCode(false)">Evaluate input</button>
