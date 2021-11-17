declare namespace Game {
  type Die = { color: string; number: number };
  type Dice = Die[];
  type Colors = "red" | "green" | "yellow" | "blue";
  type Board = Record<Game.Colors, { number: number; checked: boolean }[]>;
}
