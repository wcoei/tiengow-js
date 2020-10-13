import Player from "./player";
import ActionResponse from "../types/actionResponse";
import Tiles from "../types/tile";
import RoundState from "../types/roundState";


class HumanPlayer extends Player {
  constructor(name: string, isCheat: boolean, isCPU: boolean) {
   super(name, isCheat, isCPU);
  }

  public getAction(tiles : Tiles[], state: RoundState) : ActionResponse {
    return this.getActionFromTiles(tiles, state);
  }

  public autoAction(state: RoundState) : ActionResponse {
    return {
      action: undefined,
      isSuccess: false, 
      message: "Human player should not call this function. "
    }
  }
}

export default HumanPlayer;