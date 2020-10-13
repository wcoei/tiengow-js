import RoundState from "../types/roundState";
import ActionResponse from "../types/actionResponse";
import Player from "./player";
import { getAllLegalCombinationFromTiles, getWinningAction } from "../common/tileUtil";
import { pickRandomNumbers } from "../common/util";
import Tile from "../types/tile";

import { exception } from "console";

class RandomPlayer extends Player {
  constructor(name: string, isCheat: boolean, isCPU: boolean) {
   super(name, isCheat, isCPU);
  }

  public autoAction(state: RoundState) : ActionResponse {
    let allCombos = getAllLegalCombinationFromTiles(state.myOnHandDeck!);
    let actionResponse;
    //if current player is the first player in this turn, pick a random legal moves
    if (state.turnWinningAction == undefined) {
      actionResponse = this.getActionFromTiles(
        allCombos[Math.floor(Math.random() * allCombos.length)].tiles, state
      );
    }
    // if current player is not the first player in this turn, follow previous order to pick tiles
    else {
      if (allCombos != undefined && allCombos.length > 0) {
        allCombos = allCombos.filter((combo) => combo.combination!.code == state.turnWinningAction!.combination.code);
      }

      //if there is still legal actions, pick a random one
      if (allCombos != undefined && allCombos.length > 0) {
        actionResponse = this.getActionFromTiles(
          allCombos[Math.floor(Math.random() * allCombos.length)].tiles, state
        );
      }

      //pick random tiles following the previous action and PASS
      else {
        let pickedIndex = pickRandomNumbers(
          0,
          state.myOnHandDeck!.length,
          state.turnWinningAction!.tiles.length
        );

        let pickedTiles = pickedIndex.map((i) => state.myOnHandDeck![i]);

        actionResponse = this.getActionFromTiles( pickedTiles , state);
      }
    }

    return actionResponse;
  }

  public getAction(tiles: Tile[], state: RoundState) : ActionResponse {
    return {
      action: undefined,
      isSuccess: false, 
      message: "Robot player should not call this function. "
    }
  }
}

export default RandomPlayer;