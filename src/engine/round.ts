import _ from "lodash";

import Deck from "../types/deck";
import Tiles from "../types/tile";
import Player from "../player/player";
import RoundState from "../types/roundState";
import Action from "../types/action";
import ActionResponse from "../types/actionResponse";
import combinations, { combinationDetail } from "../types/combination";
import CombinationTypes from "../types/combinationType";
import CombintationTypes from "../types/combinationType";
import RoundResult from "../types/roundResult";
import { pickRandomNumbers } from "../common/util";
import {
  getAllLegalCombinationFromTiles,
  getWinningAction,
} from "../common/tileUtil";
import { exception } from "console";

class Round {
  protected decks: Deck = new Deck();
  protected isEnd: boolean = false;
  protected players: Player[];
  protected multiplier: number = 1;
  protected playerDecks: Tiles[][] = this.decks.playerDecks;
  protected onHandDecks: Tiles[][] = _.cloneDeep(this.playerDecks);
  protected shownDecks: Tiles[][] = [[], [], [], []];
  protected currentPlayer: number;
  protected hostPlayer: number;
  protected turnPlayerActions: Action[] = [];
  protected turnWinningAction?: Action = undefined;
  protected playerPiles: number[] = [0, 0, 0, 0];
  protected turnProgress: number = 0;
  protected roundResult?: RoundResult = undefined;
  protected bonus: number[] = [0, 0, 0, 0];
  protected payout: number[] = [0, 0, 0, 0];
  protected isTurnEnd = false;

  constructor(players: Player[], hostPlayer: number, multiplier: number) {
    this.players = players;
    this.currentPlayer = hostPlayer;
    this.hostPlayer = hostPlayer;
    this.multiplier = multiplier;
  }

  public step(
    actionResponse?: ActionResponse
  ): { isSuccess: boolean; message: string } {
    //no more action is allowed if the round is ended
    if (this.isEnd) {
      return {
        isSuccess: false,
        message: "This round is already ended. No more actions is allowed. ",
      };
    }

    if (this.isTurnEnd) {
      console.log("clear turn info");
      this.turnWinningAction = undefined;
      this.turnPlayerActions = [];
      this.turnProgress = 0;
      this.isTurnEnd = false;
      return {
        isSuccess: true,
        message: "Going to next turn. ",
      };
    }

    // if last loop is the end of turn, then reset the turn related variables
    if (this.turnProgress == 0) {
      this.turnWinningAction = undefined;
      this.turnPlayerActions = [];
    }

    //return if a legal action is not found
    if (!actionResponse!.isSuccess) {
      return {
        isSuccess: false,
        message: actionResponse!.message,
      };
    }
    //push to turn player action history
    this.turnPlayerActions.push(actionResponse!.action!);

    let pickedIndex = actionResponse!
      .action!.tiles.map((tile) => tile.id)
      .sort((tile1, tile2) => tile1 - tile2);
    let pickedTiles =
      pickedIndex!
        .map(
          (i) =>
            this.onHandDecks[this.currentPlayer].find((tile) => tile.id == i)!
        )
        .sort((tile1, tile2) => tile1!.id - tile2!.id) ?? [];

    // push tiles to the shownDecks but if the action is PASS, don't push
    if (actionResponse!.action?.combination.code != "PASS") {
      this.shownDecks[this.currentPlayer] = this.shownDecks[this.currentPlayer]
        .concat(pickedTiles!)
        .sort((tile1, tile2) => tile1.id - tile2.id);
    }

    // remove the tiles which is picked from on hand deck in this action
    for (let i = pickedIndex.length - 1; i >= 0; i--) {
      for (
        let j = this.onHandDecks[this.currentPlayer].length - 1;
        j >= 0;
        j--
      ) {
        if (pickedIndex[i] == this.onHandDecks[this.currentPlayer][j]?.id) {
          delete this.onHandDecks[this.currentPlayer][j];
        }
      }
    }
    this.onHandDecks[this.currentPlayer] = this.onHandDecks[
      this.currentPlayer
    ].filter((tile) => tile != undefined);

    //pay prime bonus if it is not ending the turn
    if (this.onHandDecks[this.currentPlayer].length != 0) {
      if (
        actionResponse!.action?.combination.type ==
          CombinationTypes.PrimeCivil ||
        actionResponse!.action?.combination.type ==
          CombinationTypes.PrimeMilitary
      ) {
        this._payBonus(this.currentPlayer, 2);
      }
    }

    //calculate and update the winning action in this turn
    this.turnWinningAction = getWinningAction(this.turnPlayerActions);

    this.turnProgress++;

    //all player decks is empty, this is the end of round
    if (_.flatten(this.onHandDecks).length == 0) {
      this.isEnd = true;
    }

    //end of turn
    if (this.turnProgress == 4) {
      this.isTurnEnd = true;
      //winning will take the piles in this round
      this.playerPiles[
        this.turnWinningAction!.playerId!
      ] += this.turnWinningAction!.tiles.length!;
      //the winning of this turn will be the first player of next turn
      this.currentPlayer = this.turnWinningAction?.playerId!;

      //if not ending game, evaluate Quadruple Bonus
      if (
        this.isEnd &&
        this.turnWinningAction!.combination.type == CombinationTypes.Quadruple
      ) {
        this._payBonus(this.turnWinningAction!.playerId!, 4);
      }
    }
    //if not the end of turn, set the next player to currentPlayer
    else {
      this.currentPlayer = (this.currentPlayer + 1) % 4;
    }

    if (this.isEnd) {
      this._endRound();
    }

    return {
      isSuccess: true,
      message: actionResponse!.action?.toString() ?? "",
    };
  }

  public getRoundState(): RoundState {
    return {
      hostPlayer: this.hostPlayer,
      currentPlayer: this.currentPlayer,
      multiplier: this.multiplier,
      playerDecks: _.cloneDeep(this.playerDecks),
      shownDecks: _.cloneDeep(this.shownDecks),
      onHandDecks: _.cloneDeep(this.onHandDecks),
      turnPlayerActions: _.cloneDeep(this.turnPlayerActions),
      turnWinningAction: _.cloneDeep(this.turnWinningAction),
      turnProgress: this.turnProgress,
      playerPiles: _.cloneDeep(this.playerPiles),
      isEnd: this.isEnd,
      roundResult: this.roundResult,
      isTurnEnd: this.isTurnEnd,
    };
  }

  private _payBonus(playerId: number, base: number) {
    let currentIndex = playerId;
    let total = 0;
    let multiplier = playerId == this.hostPlayer ? this.multiplier : 1;
    for (let i = 0; i < 3; i++) {
      let primeBonus = 0;
      currentIndex = (currentIndex + 1) % 4;
      if (this.hostPlayer == currentIndex) {
        primeBonus = base * multiplier;
      } else {
        primeBonus = base;
      }
      this.bonus[currentIndex] -= primeBonus;
      total += primeBonus;
    }
    this.bonus[playerId] += total;
  }

  private _endRound() {
    if (
      this.turnPlayerActions.length != 4 &&
      this.turnWinningAction == undefined
    ) {
      throw exception("wrong timing to call _endRound");
    }

    // pre calculate the score from player piles obtained
    let scores = this.playerPiles.map((piles) => (piles == 0 ? -5 : piles - 4));
    let isCatch = false;
    let bonusMultiplier = 1;

    //catch logic
    if (
      (this.turnWinningAction!.combination.code == "SIX1" &&
        this.turnPlayerActions[0].combination.code == "THREE1") ||
      (this.turnWinningAction!.combination.code.substring(0, 3) == "LEG" &&
        this.turnPlayerActions[0].combination.code.substring(0, 6) == "MALLET")
    ) {
      isCatch = true;
      bonusMultiplier = 2;
    }

    // If Quadruple ending game, multiple by 4
    else if (
      this.turnWinningAction?.combination.type == CombinationTypes.Quadruple
    ) {
      bonusMultiplier = 4;
    }

    let playerIndex = this.turnWinningAction!.playerId;
    let total = 0;

    // loop for the 3 losers
    for (let i = 0; i < 3; i++) {
      playerIndex = (playerIndex + 1) % 4;

      // bonus Multiplier not apply on extra pile
      let actualBonusMultiplier =
        scores[playerIndex] >= 0 ? 1 : bonusMultiplier;
      // if the loser is the host, his loss will be multiplied
      if (this.hostPlayer == playerIndex) {
        this.payout[playerIndex] =
          scores[playerIndex] * this.multiplier * bonusMultiplier;
      } else {
        this.payout[playerIndex] = scores[playerIndex] * bonusMultiplier;
      }
      total += this.payout[playerIndex];
    }
    // all loser's loss will become the gain of winner
    this.payout[this.turnWinningAction!.playerId] = -1 * total;

    //the loser being caught needs to compensate the loss of other losers
    if (isCatch) {
      playerIndex = this.turnWinningAction!.playerId;
      for (let i = 0; i < 3; i++) {
        if (
          playerIndex != this.turnPlayerActions[0].playerId &&
          this.payout[playerIndex] < 0
        ) {
          this.payout[this.turnPlayerActions[0].playerId] += this.payout[
            playerIndex
          ];
          this.payout[playerIndex] = 0;
        }
      }
    }
    this.roundResult = {
      winner: this.turnWinningAction!.playerId,
      bonus: this.bonus,
      payout: this.payout,
    };
  }
}

export default Round;
