import Board from "../classes/Board.js";

export default function winChecker(board: Board): boolean {
  const rows: number = 6;
  const columns: number = 7;

  function checkHorizontalWin(): boolean {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col <= columns - 4; col++) {
        if (
          board.matrix[row][col] === board.currentPlayerSymbol &&
          board.matrix[row][col + 1] === board.currentPlayerSymbol &&
          board.matrix[row][col + 2] === board.currentPlayerSymbol &&
          board.matrix[row][col + 3] === board.currentPlayerSymbol
        ) {
          board.winner = board.currentPlayerSymbol;
          board.gameOver = true;

          return true;
        }
      }
    }
    return false;
  }
  function checkVerticalWin(): boolean {
    for (let col = 0; col < columns; col++) {
      for (let row = 0; row <= rows - 4; row++) {
        if (
          board.matrix[row][col] === board.currentPlayerSymbol &&
          board.matrix[row + 1][col] === board.currentPlayerSymbol &&
          board.matrix[row + 2][col] === board.currentPlayerSymbol &&
          board.matrix[row + 3][col] === board.currentPlayerSymbol
        ) {
          board.winner = board.currentPlayerSymbol;
          board.gameOver = true;
          return true;
        }
      }
    }
    return false;
  }
  function checkDiagonalWin1(): boolean {
    for (let row = 0; row <= rows - 4; row++) {
      for (let col = 0; col <= columns - 4; col++) {
        if (
          board.matrix[row][col] === board.currentPlayerSymbol &&
          board.matrix[row + 1][col + 1] === board.currentPlayerSymbol &&
          board.matrix[row + 2][col + 2] === board.currentPlayerSymbol &&
          board.matrix[row + 3][col + 3] === board.currentPlayerSymbol
        ) {
          board.winner = board.currentPlayerSymbol;
          board.gameOver = true;

          return true;
        }
      }
    }
    return false;
  }
  function checkDiagonalWin2(): boolean {
    for (let row = 3; row < rows; row++) {
      for (let col = 0; col <= columns - 4; col++) {
        if (
          board.matrix[row][col] === board.currentPlayerSymbol &&
          board.matrix[row - 1][col + 1] === board.currentPlayerSymbol &&
          board.matrix[row - 2][col + 2] === board.currentPlayerSymbol &&
          board.matrix[row - 3][col + 3] === board.currentPlayerSymbol
        ) {
          board.winner = board.currentPlayerSymbol;
          board.gameOver = true;

          return true;
        }
      }
    }
    return false;
  }
  function boardFull(): boolean {
    const isFull = board.matrix.every((row) =>
      row.every((cell) => cell !== " ")
    );

    if (isFull && !board.winner) {
      board.isADraw = true;
      board.gameOver = true;
    }

    return isFull;
  }

  function winCheck(): boolean {
    return (
      checkHorizontalWin() ||
      checkVerticalWin() ||
      checkDiagonalWin1() ||
      checkDiagonalWin2() ||
      boardFull()
    );
  }

  return winCheck() || boardFull();
}
