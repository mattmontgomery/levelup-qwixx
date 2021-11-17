import events from "events";

const VALID_NUMBERS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export class Game {
  private static colors: (Game.Colors | "white")[] = [
    "white",
    "white",
    "red",
    "green",
    "blue",
    "yellow",
  ];
  private playerBoard: Game.Board = {
    red: [],
    green: [],
    blue: [],
    yellow: [],
  };
  private emitter: events.EventEmitter;
  constructor(emitter: events.EventEmitter) {
    this.emitter = emitter;
    this.setPlayerBoard(Game.getEmptyBoard());
  }
  public static rollDice(): { color: string; number: number }[] {
    return this.colors.map((c) => ({
      color: c,
      number: Math.ceil(Math.random() * 6),
    }));
  }
  setPlayerBoard(board: Game.Board) {
    this.playerBoard = board;
    this.emitter.emit("board", this.playerBoard);
  }
  selectNumber(color: Game.Colors, number: number) {
    this.setPlayerBoard({
      ...this.playerBoard,
      [color]: [
        ...this.playerBoard[color].slice(
          0,
          this.playerBoard[color].findIndex((c) => c.number === number)
        ),
        { number, checked: true },
        ...this.playerBoard[color].slice(
          this.playerBoard[color].findIndex((c) => c.number === number) + 1
        ),
      ],
    });
  }
  public static getEmptyBoard(): Game.Board {
    return {
      red: VALID_NUMBERS.map((n) => ({ number: n, checked: false })),
      yellow: VALID_NUMBERS.map((n) => ({
        number: n,
        checked: false,
      })),
      green: VALID_NUMBERS.map((n) => ({
        number: n,
        checked: false,
      })).reverse(),
      blue: VALID_NUMBERS.map((n) => ({ number: n, checked: false })).reverse(),
    };
  }
  public static init(emitter: events.EventEmitter): Game {
    return new Game(emitter);
  }
}
