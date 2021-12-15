var inputRows = input.split("\n");
var result;

var numbers = inputRows[0].split(",").map(n => parseInt(n));

var boards = [];
for(i = 2; i<inputRows.length; i+=6) {
  var board = [];
  for(j=0; j<5; j++) {
    board.push(inputRows[i+j].trim().split(/ +/).map(n => parseInt(n)).map(n => [n, false]));
  }
  boards.push(board);
}

var finished = false;
var completed = -1;
for(var i=0; i<numbers.length && !finished; i++) {
  for(var b=0; b<boards.length && !finished; b++) {
    for(var r=0; r<5 && !finished; r++) {
      for(var c=0; c<5 && !finished; c++) {
        if(boards[b][r][c][0] == numbers[i]) {
          boards[b][r][c][1] = true;
          var isCompleted = checkCompleted(boards[b]);
          if(isCompleted) {
            finished = true;
            completed = b;
            result = numbers[i] * sumUnmarked(boards[b]);
          }
        }
      }
    }
  }
}

log(`result: ${result}`);

function checkCompletedRow(row) {
  for(var i=0; i<5; i++) {
    if(!row[i][1]) { return false; }
  }
  return true;
}

function checkCompletedColumn(column) {
  for(var i=0; i<5; i++) {
    if(!column[i][1]) { return false; }
  }
  return true;
}

function checkCompleted(board) {
  for(var i=0; i<5; i++) {
    if(checkCompletedRow(board[i])) { return true; }
    if(checkCompletedColumn(board.map(r => r[i]))) { return true; }
  }
  return false;
}

function sumUnmarked(board) {
  var sum = 0;
  for(var i=0; i<5; i++) {
    for(var j=0; j<5; j++) {
      if(!board[i][j][1]) {
        sum+=board[i][j][0];
      }
    }
  }
  return sum;
}
