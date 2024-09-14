export default class Board {
  matrix: Array<Array<string>>;
  currentPlayerSymbol: string;
  gameOver: boolean;
  isADraw: boolean;
  winner: string | boolean;

  constructor() {
    this.matrix = [...new Array(6)].map((_row) =>
      [...new Array(7)].map((_column) => " ")
    );
    this.currentPlayerSymbol = "X";
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
  }
  render(): void {
    let line = "\n" + "-".repeat(30) + "\n";
    console.log(
      line +
        this.matrix
          .map((row) => row.map((column) => `| ${column} `).join("") + "|")
          .join(line) +
        line
    );
  }

  makeMove(symbol: string, column: number): boolean {
    // don't make any move if the game is over
    if (this.gameOver) {
      return false;
    }
    // check that the color is X or O - otherwise don't make the move
    if (symbol !== "X" && symbol !== "O") {
      return false;
    }
    // check that the color matches the player's turn - otherwise don't make the move
    if (symbol !== this.currentPlayerSymbol) {
      return false;
    }
    // check that the column is a number - otherwise don't make the move
    if (isNaN(column)) {
      return false;
    }

    // check that the column is between 0 and 6 - otherwise don't make the move
    if (column < 0 || column >= this.matrix[0].length) {
      return false;
    }

    //check if the column is full //might bug the game if any row is full
    for (let i = 0; i >= 5; i--) {
      if (this.matrix[5][i] !== " ") {
        return false;
      }
    }
    //check for first spot in column that is undefined and fill that spot
    for (let i = 5; i >= 0; i--) {
      if (this.matrix[i][column] === " ") {
        this.currentPlayerSymbol = this.currentPlayerSymbol === "X" ? "O" : "X";
        this.matrix[i][column] = symbol;

        return true;
      }
    }
    this.winner = this.winCheck();
    this.isADraw = this.drawCheck();
    this.gameOver = !!(this.winner || this.isADraw);
    return true;
  }

  winCheck(): string | false {
    // m - a short alias for this.matrix
    let m = this.matrix;
    // represent ways you can win as offset from ONE position on the board
    let offsets = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ], // horizontal win
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ], // vertical win
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ], // diagonal 1 win
      [
        [0, 0],
        [1, -1],
        [2, -2],
      ], // diagonal 2 win
    ];
    // loop through each player color, each position (row + column),
    // each winType/offsets and each offset coordinate added to the position
    // to check if someone has won :)
    for (let color of "XO") {
      // r = row, c = column
      for (let r = 0; r < m.length; r++) {
        for (let c = 0; c < m[0].length; c++) {
          // ro = row offset, co = column offset
          for (let winType of offsets) {
            let colorsInCombo = "";
            for (let [ro, co] of winType) {
              colorsInCombo += (m[r + ro] || [])[c + co];
            }
            if (colorsInCombo === color.repeat(3)) {
              return color;
            }
          }
        }
      }
    }
    return false;
  }
  drawCheck(): boolean {
    // if no one has won and no empty positions then it's a draw
    return !this.winCheck() && !this.matrix.flat().includes(" ");
  }
}
