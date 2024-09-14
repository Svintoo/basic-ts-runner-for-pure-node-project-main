import prompt from "../helpers/prompt.js";
import Board from "./Board.js";
import Player from "./Player.js";

export default class App {
  board: Board;
  // note: if order to not be forced to assign player instances
  // in the constructor (but be free to do in another method),
  // add this to tsconfig.json,
  // under compilerOptions: "strictPropertyInitialization": false
  playerX: Player;
  playerO: Player;

  constructor() {
    // a while-loop that let us play the game repeatedly
    while (true) {
      this.createPlayers();
      this.board = new Board();
      // this.board.matrix[5][8] = "X";
      this.startGameLoop();
      this.whoHasWonOnGameOver();
      // ask if we should play again
      console.log("");
      let playAgain = prompt("Vill ni spela igen? (ja/nej)? ");
      if (playAgain !== "ja") {
        break;
      }
    }
  }

  createPlayers(): void {
    console.clear();

    console.log("TIC-TAC-TOE\n");
    this.playerX = new Player(prompt("Spelare X:s namn: "), "X", this.board);
    this.playerO = new Player(prompt("Spelare O:s namn: "), "O", this.board);
  }

  startGameLoop(): void {
    while (!this.board.gameOver) {
      console.clear();
      this.board.render();
      let player =
        this.board.currentPlayerSymbol === "X" ? this.playerX : this.playerO;
      let column =
        Number(
          prompt(
            `Ange ditt drag ${player.color} ${player.name} - skriv in kolumn: `
          )
        ) - 1;
      //- 1 för att få rätt indexering för UX
      this.board.makeMove(player.color, column);
    }
  }

  whoHasWonOnGameOver(): void {
    // the game is over, tell the player who has one or if we have a draw
    console.clear();
    console.log(this.board.matrix);
    this.board.render();
    if (this.board.winner) {
      let winningPlayer =
        this.board.winner === "X" ? this.playerX : this.playerO;
      console.log(
        `Grattis ${winningPlayer.color}: ${winningPlayer.name} du vann!`
      );
    } else {
      console.log("Tyvärr det blev oavgjort...");
    }
  }
}
