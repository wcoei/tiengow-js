import Tiles from "./tile";
import { combinationDetail } from "./combination";
import ct from "./combinationType"

class Action {
  public playerId: number;
  public combination: combinationDetail;
  public tiles: Tiles[];

  constructor({
    playerId,
    combination,
    tiles,
  }: {
    playerId: number;
    combination: combinationDetail;
    tiles: Tiles[];
  }) {
    this.playerId = playerId;
    this.combination = combination;
    this.tiles = tiles.sort((tile1, tile2) => tile1.id - tile2.id);
  }

  toString(): string {
    return `Player ${this.playerId}: ${this.combination.code} - [${
      this.tiles ? this.tiles.map((tile) => tile.code).join(", ") : "NO INFO"
    }]`;
  }
};

export default Action;
