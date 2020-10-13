import ActionResponse from "../types/actionResponse";
import RoundState from "../types/roundState";
import Tiles from "../types/tile";
import { getAllLegalCombinationFromTiles, getWinningAction } from "../common/tileUtil";
import Action from "../types/action";
import combinations from "../types/combination";

abstract class Players {
  public name: string;
  public isCheat: boolean;
  public isCPU: boolean;

  constructor(name: string, isCheat: boolean, isCPU: boolean) {
    this.name = name;
    this.isCheat = isCheat;
    this.isCPU = isCPU;
  }

  public abstract getAction(tiles : Tiles[], state: RoundState) : ActionResponse;
  public abstract autoAction(state: RoundState) : ActionResponse;


  protected getActionFromTiles(
    actionTiles: Tiles[],
    state: RoundState
  ): ActionResponse {
    //presort the action tiles
    actionTiles = actionTiles.sort((tile1, tile2) => tile1.id - tile2.id);
    let legalActions = getAllLegalCombinationFromTiles(actionTiles);

    //you need to follow previous action, therefore filter those do not follow.
    if (
      state.turnPlayerActions != undefined &&
      state.turnPlayerActions.length > 0
    ) {
      const winningAction = getWinningAction(state.turnPlayerActions);

      //fail if number of tiles does not follow previous action
      if (winningAction!.tiles.length != actionTiles.length) {
        return {
          isSuccess: false,
          action: undefined,
          message:
            "Your number of tiles in this action does not match with previous action.",
        };
      }
      //if it is the last round and you have no pile, you can only pass the turn
      if (
        state.myOnHandDeck!.length == 1 &&
        state.playerPiles[state.currentPlayer] == 0
      ) {
        legalActions = [];
      }
      //filter those combination it does not follow previous action and those cannot win
      legalActions = legalActions.filter(
        (action) =>
          action.combination != undefined &&
          winningAction != undefined &&
          action.combination?.type == winningAction?.combination.type &&
          action.combination?.rank < winningAction?.combination.rank
      );
    }
    //search this result with the selected tiles
    legalActions = legalActions.filter(
      (action) =>
        action.combination!.code ==
        actionTiles.map((tile) => tile.code).join("_")
    );

    //the only action if no legal actions is to pass this turn
    if (legalActions == undefined || legalActions.length == 0) {
      if (
        state.turnPlayerActions != undefined &&
        state.turnPlayerActions.length > 0
      ) {
        return {
          isSuccess: true,
          action: new Action({
            playerId: state.currentPlayer,
            combination: combinations.find((combo) => combo.code == "PASS")!,
            tiles: actionTiles,
          }),
          message: "You pass in this turn. ",
        };
      } else {
        return {
          isSuccess: false,
          action: undefined,
          message:
            "Your action is invalid if you are the first player of this turn. ",
        };
      }
    }
    //return if one legal action is found
    const action = new Action({
      playerId: state.currentPlayer,
      combination: legalActions[0].combination!,
      tiles: legalActions[0].tiles,
    });
    return {
      isSuccess: true,
      action,
      message: action.toString(),
    };
  }
}

export default Players;
