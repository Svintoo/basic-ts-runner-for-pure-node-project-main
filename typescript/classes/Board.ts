import winChecker from "../utils/winChecker.js";

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
    if (this.gameOver) {
      return false;
    }
    if (symbol !== "X" && symbol !== "O") {
      return false;
    }
    if (symbol !== this.currentPlayerSymbol) {
      return false;
    }
    if (isNaN(column)) {
      return false;
    }

    if (column < 0 || column >= this.matrix[0].length) {
      return false;
    }

    if (this.matrix[0][column] !== " ") {
      return false;
    }
    for (let i = 5; i >= 0; i--) {
      if (this.matrix[i][column] === " ") {
        this.matrix[i][column] = symbol;

        if (winChecker(this)) {
          this.gameOver = true;
        } else {
          this.currentPlayerSymbol =
            this.currentPlayerSymbol === "X" ? "O" : "X";
        }
        return true;
      }
    }
    return true;
  }
}
