import Board from "./Board.js";
import { getRandomInt } from "../utils/utils.js";

export default class Player {
  name: string;
  symbol: string;
  board: Board;
  isComputer: boolean;

  constructor(
    name: string,
    color: string,
    board: Board,
    isComputer: boolean = false
  ) {
    this.name = name;
    this.symbol = color;
    this.board = board;
    this.isComputer = isComputer;
  }

  computerMove(): number {
    let move = getRandomInt(7);
    return move;
  }
}
