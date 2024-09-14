export default class Board {
  matrix: Array<Array<string>>;
  currentPlayerSymbol: string;
  gameOver: boolean;
  isADraw: boolean;
  winner: string | boolean;

  constructor() {
    this.matrix = [...new Array(7)].map((_row) =>
      [...new Array(7)].map((_column) => " ")
    );
    // currentPlayer, whose turn is it?
    this.currentPlayerSymbol = "X";
    // status of game (updated after each move)
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
}
