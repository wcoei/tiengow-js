import Tiles from "./tile";
import ActionTypes from "./actionTypes";

class Action {
  public playerId: number;
  public actionType: ActionTypes;
  public tiles: Tiles[];

  constructor({
    playerId,
    actionType,
    tiles,
  }: {
    playerId: number;
    actionType: ActionTypes;
    tiles: Tiles[];
  }) {
    this.playerId = playerId;
    this.actionType = actionType;
    this.tiles = tiles.sort((tile1, tile2) => tile1.id - tile2.id);
  }
}

export default Action;
