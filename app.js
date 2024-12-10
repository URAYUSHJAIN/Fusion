document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.querySelector("#score");
  const resultDisplay = document.querySelector("#result");
  const width = 4;
  let squares = [];
  let score = 0;

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
  }

  createBoard();

  function generate() {
    const randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
    } else {
      generate();
    }
  }

  // Move tiles right
  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let row = [
          parseInt(squares[i].innerHTML),
          parseInt(squares[i + 1].innerHTML),
          parseInt(squares[i + 2].innerHTML),
          parseInt(squares[i + 3].innerHTML),
        ];
        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  // Move tiles left
  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let row = [
          parseInt(squares[i].innerHTML),
          parseInt(squares[i + 1].innerHTML),
          parseInt(squares[i + 2].innerHTML),
          parseInt(squares[i + 3].innerHTML),
        ];
        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  // Move tiles up
  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let column = [
        parseInt(squares[i].innerHTML),
        parseInt(squares[i + width].innerHTML),
        parseInt(squares[i + width * 2].innerHTML),
        parseInt(squares[i + width * 3].innerHTML),
      ];
      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeros);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }

  // Move tiles down
  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let column = [
        parseInt(squares[i].innerHTML),
        parseInt(squares[i + width].innerHTML),
        parseInt(squares[i + width * 2].innerHTML),
        parseInt(squares[i + width * 3].innerHTML),
      ];
      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }

  // Combine rows
  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
  }

  // Combine columns
  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + width].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
  }

  function control(e) {
    if (e.key === "ArrowLeft") {
      keyLeft();
    } else if (e.key === "ArrowRight") {
      keyRight();
    } else if (e.key === "ArrowUp") {
      keyUp();
    } else if (e.key === "ArrowDown") {
      keyDown();
    }
  }

  document.addEventListener("keydown", control);

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generate();
  }

  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
  }

  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generate();
  }

  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generate();
  }

  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = "You win 🎉🎉";
        document.removeEventListener("keydown", control);
      }
    }
  }

  function checkForGameOver() {
    let zeros = squares.filter((square) => square.innerHTML == 0).length;
    if (zeros === 0) {
      resultDisplay.innerHTML = "Game Over 😔";
      document.removeEventListener("keydown", control);
    }
  }

  function addColours() {
    squares.forEach((square) => {
      const value = parseInt(square.innerHTML);
      square.style.backgroundColor =
        value === 0
          ? "#afa192"
          : value === 2
          ? "#eee4da"
          : value === 4
          ? "#ede0c8"
          : value === 8
          ? "#f2b179"
          : value === 16
          ? "#e8c064"
          : value === 32
          ? "#ffab6e"
          : value === 64
          ? "#f65e3b"
          : value === 128
          ? "#edcf72"
          : value === 256
          ? "#edcc61"
          : value === 512
          ? "#edc850"
          : value === 1024
          ? "#edc53f"
          : "#edc22e";
    });
  }

  setInterval(addColours, 50);
});
