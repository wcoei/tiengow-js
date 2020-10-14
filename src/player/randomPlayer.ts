import RoundState from "../types/roundState";
import ActionResponse from "../types/actionResponse";
import Player from "./player";
import { getAllLegalCombinationFromTiles, getWinningAction } from "../common/tileUtil";
import { pickRandomNumbers } from "../common/util";
import Tile from "../types/tile";

import { exception } from "console";
import Round from "../engine/round";

class RandomPlayer extends Player {
  constructor(name: string, isCheat: boolean, isCPU: boolean) {
   super(name, isCheat, isCPU);
  }

  public autoAction(state: RoundState) : ActionResponse {
    let myOnHandDeck = state.onHandDecks![state.currentPlayer];
    console.log("auto1");
    let allCombos = getAllLegalCombinationFromTiles(myOnHandDeck);
    console.log("auto2");
    let actionResponse;
    //if current player is the first player in this turn, pick a random legal moves
    if (state.turnWinningAction == undefined) {
      console.log("auto3");

      actionResponse = this.getActionFromTiles(
        allCombos[Math.floor(Math.random() * allCombos.length)].tiles, state
      );
      console.log("auto4");
    }
    // if current player is not the first player in this turn, follow previous order to pick tiles
    else {
      console.log("auto5");
      if (allCombos != undefined && allCombos.length > 0) {
        allCombos = allCombos.filter((combo) => combo.combination!.code == state.turnWinningAction!.combination.code);
      }
      console.log("auto6");
      //if there is still legal actions, pick a random one
      if (allCombos != undefined && allCombos.length > 0) {
        actionResponse = this.getActionFromTiles(
          allCombos[Math.floor(Math.random() * allCombos.length)].tiles, state
        );
      }
      //pick random tiles following the previous action and PASS
      else {
        console.log("auto7");
        let pickedIndex = pickRandomNumbers(
          0,
          myOnHandDeck.length,
          state.turnWinningAction!.tiles.length
        );
        console.log("auto8");

        let pickedTiles = pickedIndex.map((i) => myOnHandDeck[i]);
        console.log("auto9");
        actionResponse = this.getActionFromTiles( pickedTiles , state);
        console.log("auto10");
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