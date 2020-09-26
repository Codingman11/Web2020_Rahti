import "./styles.css";

var MAX = 5,
  EMPTY = "",
  player = "X",
  turn = 0,
  moves = 0;

let ticArray = new Array(5);

function makeArray(board) {
  for (let i = 0; i <= MAX; i++) {
    board[i] = new Array(5);
  }
}
function createTable() {
  let table = document.createElement("table");
  table.setAttribute("id", "table");
  var a = 0;
  for (let i = 0; i < MAX; i++) {
    let tabRow = document.createElement("tr");
    tabRow.setAttribute("id", "row");

    for (let j = 0; j < MAX; j++) {
      let tabCell = document.createElement("td");
      tabCell.setAttribute("id", a);

      tabCell.addEventListener("click", set, false);
      let node = document.createTextNode("");

      ticArray[i][j] = "";
      tabCell.appendChild(node);

      tabRow.appendChild(tabCell);
    }
    table.appendChild(tabRow);
  }

  var board = document.getElementById("board");
  board.appendChild(table);
}

//Making the progress bar functional
function move() {
  var myBar = document.getElementById("myBar");
  let time = 0;
  var width = 0;
  var id = setInterval(frame, 1000);
  function frame() {
    if (time > 10) {
      clearInterval(id);
      return false;
    } else {
      time++;
      width += 38;
      myBar.style.width = width + "px";
    }
  }
}

function set(event) {
  move();
  if (this.innerHTML === EMPTY && turn === 0) {
    this.innerHTML = player;
    turn = 1;
    player = "O";
    moves++;

    ticArray[event.target.parentNode.rowIndex][event.target.cellIndex] = "X";
    this.classList.add("x");
  } else if (this.innerHTML === EMPTY && turn === 1) {
    this.innerHTML = player;
    turn = 0;
    player = "X";
    ticArray[event.target.parentNode.rowIndex][event.target.cellIndex] = "O";
    moves++;
    this.classList.add("o");
  } else {
    alert("This is already marked. Try again!");
  }

  if (winCondition()) {
    alert("Winner!");
    reset();
  } else if (moves === 25) {
    alert("Draw");
    reset();
  }
}

function winCondition() {
  //Initializing attributes for checking win condition
  let move;

  //Check row

  for (let row = 0; row < MAX; row++) {
    move = 0;
    for (let col = 0; col < MAX; col++) {
      if (ticArray[row][col] === EMPTY) {
        continue;
      } else if (ticArray[row][col] === ticArray[row][col + 1]) {
        move++;
        if (move === 4) {
          return true;
        }
      }
    }
  }

  //Check col
  for (let col = 0; col < MAX; col++) {
    move = 0;
    for (let row = 0; row < MAX; row++) {
      if (ticArray[row][col] === EMPTY) {
        continue;
      } else if (ticArray[row][col] === ticArray[row + 1][col]) {
        move++;
        if (move === 4) {
          return true;
        }
      }
    }
  }

  //check diagonal
  for (let row = 0; row < MAX; row++) {
    //Initialiazing attributes
    let check_dia1 = 0;
    let check_dia2 = 0;
    let check_dia3 = 0;
    let check_dia4 = 0;
    for (let col = 0, k = row; col < MAX; col++, k++) {
      if (ticArray[col][k] === EMPTY) {
        continue;
      } else if (ticArray[col][k] === "X") {
        check_dia1++;
        if (check_dia1 === 5) {
          return true;
        }
      } else if (ticArray[col][k] === "O") {
        check_dia2++;
        if (check_dia2 === 5) {
          return true;
        }
      }
    }

    //Checking the antidiagonal
    for (let col = 0, k = row; k >= 0; col++, k--) {
      if (ticArray[col][k] === EMPTY) {
        continue;
      } else if (ticArray[col][k] === "X") {
        check_dia3++;
        if (check_dia3 === 5) {
          return true;
        }
      } else if (ticArray[col][k] === "O") {
        check_dia4++;
        if (check_dia4 === 5) {
          return true;
        }
      }
    }
  }
}

function init() {
  console.log("Initializing game");
  makeArray(ticArray);
  createTable();
}

function reset() {
  window.location.reload();
}

init();
