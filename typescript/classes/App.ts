import prompt from "../helpers/prompt.js";
import validateInput from "../utils/utils.js";
import Board from "./Board.js";
import Player from "./Player.js";
import winChecker from "../utils/winChecker.js";

export default class App {
  board: Board;
  playerX: Player;
  playerO: Player;
  playerXName: string | null = null;
  playerOName: string | null = null;

  constructor() {
    while (true) {
      this.createPlayers();
      this.board = new Board();
      this.startGameLoop();
      this.whoHasWonOnGameOver();
      console.log("");
      let playAgain = prompt("Vill ni spela igen? (ja/nej)? ");
      if (playAgain !== "ja") {
        break;
      }
    }
  }
  createPlayers(): void {
    console.clear();
    console.log("Connect Four\n");
    if (!this.playerXName) {
      this.playerXName = prompt("Spelare X:s namn: ");
    }
    if (!this.playerOName) {
      this.playerOName = prompt("Spelare O:s namn: ");
    }
    this.playerX = new Player(this.playerXName || "Spelare X", "X", this.board);
    this.playerO = new Player(this.playerOName || "Spelare O", "O", this.board);
  }

  startGameLoop(): void {
    while (!this.board.gameOver) {
      console.clear();
      this.board.render();
      let player =
        this.board.currentPlayerSymbol === "X" ? this.playerX : this.playerO;
      if (
        this.board.currentPlayerSymbol === "X" ||
        this.playerO.name !== "bot"
      ) {
        let move = this.playerMove(player);
        this.board.makeMove(player.symbol, move);
      } else {
        let move = player.computerMove();
        this.board.makeMove(player.symbol, move);
      }
      if (winChecker(this.board)) {
        break;
      }
    }
  }

  whoHasWonOnGameOver(): void {
    console.clear();
    this.board.render();
    if (this.board.winner) {
      let winningPlayer =
        this.board.winner === "X" ? this.playerX : this.playerO;
      console.log(
        `Grattis ${winningPlayer.symbol}: ${winningPlayer.name} du vann!`
      );
    } else if (this.board.isADraw) {
      console.log("Brädet är fullt!");
    }
  }
  playerMove(player: Player): number {
    let input = "";
    let validatedInput: number | null = null;

    while (validatedInput === null) {
      input = prompt(
        `Ange ditt drag ${player.symbol} ${player.name} - skriv in kolumn (1-7): `
      );
      validatedInput = validateInput(input, 1, 7);

      if (validatedInput === null) {
        console.log("Ogiltig inmatning. Försök igen!");
      }
    }
    return validatedInput - 1; //- 1 för att få rätt indexering för UX
  }
}
