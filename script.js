document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.querySelector("#score");
  const resultDisplay = document.querySelector("#result");
  const width = 4;
  let squares = [];

  //create a playing board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      let square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
  }
  createBoard();

  //   generate a number randomly
  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
    } else generate();
    checkForGameOver();
  }

  //swipe right
  function moveRight() {
    for (let i = 0; i < width * width; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
        // console.log(row);

        let filterRow = row.filter((num) => num);
        // console.log(filterRow);

        let missing = width - filterRow.length;
        let zeros = Array(missing).fill(0);
        // console.log(zeros);

        let newRow = zeros.concat(filterRow);
        // console.log(newRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  //swipe left
  function moveLeft() {
    for (let i = 0; i < width * width; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
        // console.log(row);

        let filterRow = row.filter((num) => num);
        // console.log(filterRow);

        let missing = width - filterRow.length;
        let zeros = Array(missing).fill(0);
        // console.log(zeros);

        let newRow = filterRow.concat(zeros);
        // console.log(newRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  //   swipe down
  function moveDown() {
    for (let i = 0; i < width; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + 2 * width].innerHTML;
      let totalFour = squares[i + 3 * width].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filterColumn = column.filter((num) => num);
      let missing = width - filterColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filterColumn);
      // console.log(newRow);

      squares[i].innerHTML = newColumn[0];
      squares[i + 1 * width].innerHTML = newColumn[1];
      squares[i + 2 * width].innerHTML = newColumn[2];
      squares[i + 3 * width].innerHTML = newColumn[3];
    }
  }

  //   swipe up
  function moveUp() {
    for (let i = 0; i < width; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + 2 * width].innerHTML;
      let totalFour = squares[i + 3 * width].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filterColumn = column.filter((num) => num);
      let missing = width - filterColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filterColumn.concat(zeros);
      // console.log(newRow);

      squares[i].innerHTML = newColumn[0];
      squares[i + 1 * width].innerHTML = newColumn[1];
      squares[i + 2 * width].innerHTML = newColumn[2];
      squares[i + 3 * width].innerHTML = newColumn[3];
    }
  }
  //   combine the same numbers in the rows
  function combineRowRight() {
    for (let i = 0; i < width * width - 1; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);

        squares[i].innerHTML = 0;
        squares[i + 1].innerHTML = combinedTotal;
      }
    }
  }

  //   combine the same numbers in the rows
  function combineRowLeft() {
    for (let i = 0; i < width * width - 1; i++) {
      if (squares[i + 1].innerHTML === squares[i].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;
      }
    }
  }

  // combine the same numbers in the columns
  function combineColumnDown() {
    for (let i = 0; i < width * width - width; i++) {
      if (squares[i].innerHTML === squares[i + 1 * width].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + 1 * width].innerHTML);
        squares[i + 1 * width].innerHTML = combinedTotal;
        squares[i].innerHTML = 0;
      }
    }
    checkForWin();
  }
  // combine the same numbers in the columns
  function combineColumnUp() {
    for (let i = 0; i < width * width - width; i++) {
      if (squares[i + 1 * width].innerHTML === squares[i].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + 1 * width].innerHTML);
        squares[i + 1 * width].innerHTML = combinedTotal;
        squares[i].innerHTML = 0;
      }
    }
    checkForWin();
  }

  //   assign keycodes
  function control(e) {
    if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 40) {
      keyDown();
    } else if (e.keyCode === 38) {
      keyUp();
    }
  }
  document.addEventListener("keyup", control);

  function keyRight() {
    combineRowRight();
    moveRight();
    generate();
  }

  function keyLeft() {
    combineRowLeft();
    moveLeft();
    generate();
  }

  function keyDown() {
    combineColumnDown();
    moveDown();
    generate();
  }

  function keyUp() {
    combineColumnUp();
    moveUp();
    generate();
  }

  //   checkfor the number 2048
  function checkForWin() {
    squares.forEach((square) => {
      if (square.innerHTML == 2048) {
        resultDisplay.innerHTML = "You Win!";
        document.removeEventListener("keyup", control);
      }
    });
  }

  //   checkfor for game over
  function checkForGameOver() {
    let zeros = 0;
    squares.forEach((square) => {
      if (square.innerHTML == 0) {
        zeros++;
      }
    });
    if (zeros === 0) {
      resultDisplay.innerHTML = "You Lose!";
      document.removeEventListener("keyup", control);
    }
  }
});
