import faker from "faker";
import _ from "lodash";

import Round from "./round";
import Player from "../player/player";
import HumanPlayer from "../player/humanPlayer";
import RandomPlayer from "../player/randomPlayer";
import RoundState from "../types/roundState";
import Tiles from "../types/tile";
import ActionResponse from "../types/actionResponse";
import PlayerType from "../types/playerType";
import { ask, sleep } from "../common/util";
import PlayerRegister from "../types/playerRegister";
import GameState from "../types/gameState";

class Game {
  private numOfRounds = 1;
  private currentRoundIndex = 0;
  private players: Player[] = [];
  private roundState?: RoundState;
  private firstPlayer: number = 0;
  private currentMultiplier = 1;
  private currentHost = 0;
  private totalScore = [0, 0, 0, 0];
  private isEnd = false;
  private currentRound: Round;

  constructor(playerRegisters: PlayerRegister[], numOfRounds: number = 1) {
    this.numOfRounds = numOfRounds!;
    playerRegisters.forEach((player) => {
      this._registerPlayer(player.name, player.isCheat, player.isCPU, player.playerType);
    });

    // throw dice and get the first player
    this.firstPlayer = Math.floor(Math.random() * 4);
    this.currentHost = this.firstPlayer;

    this.currentRound = new Round(this.players, this.currentHost, this.currentMultiplier);
    this.roundState = this.currentRound.getRoundState();
  }

  public step(tiles?: Tiles[]): { isSuccess: boolean; message: string }  {
    if (this.isEnd) {
      return {
        isSuccess:  true,
        message: "The game is ended. "
      };
    }
    if (this.roundState!.isEnd) {
      this.currentRoundIndex++;
      this.currentRound = new Round(this.players, this.currentHost, this.currentMultiplier);
      this.roundState = this.currentRound.getRoundState();
      return {
        isSuccess: true,
        message: "Enter next round. "
      };
    }
    if (this.roundState!.isTurnEnd) {
      this.currentRound.step();
      this.roundState = this.currentRound.getRoundState();
      return {
        isSuccess: true,
        message: "Enter next turn. "
      };
    }
    // if no action tiles is provided, then use the player autoaction
    if(!tiles) {
      let actionResponse = this.players[this.roundState!.currentPlayer].autoAction(this.roundState!);
      const result = this.currentRound.step(actionResponse);
    } else {
      let actionResponse = this.players[this.roundState!.currentPlayer].getAction(tiles, this.roundState!);
      const result = this.currentRound.step(actionResponse);
      if (!result.isSuccess) {
        return {
          isSuccess: false,
          message: result.message
        };
      }
    }

    this.roundState = this.currentRound.getRoundState();

    if (this.roundState!.isEnd) {
      this.firstPlayer = this.roundState!.roundResult!.winner;
      this.totalScore = this.totalScore.map(
        (score, i) => (score += this.roundState!.roundResult!.payout[i] + this.roundState!.roundResult!.bonus[i])
      );
      if (this.currentHost == this.roundState!.roundResult!.winner) {
        this.currentMultiplier++;
      } else {
        this.currentHost = this.roundState!.roundResult!.winner;
        this.currentMultiplier = 2;
      }
      if (this.currentRoundIndex >= this.numOfRounds - 1) {
        this.isEnd = true;
      }
    }
    return {
      isSuccess:  true,
      message: "Step is completed. "
    };
  }

  public getGameState(playerId: number): GameState {
    return {
      numOfRounds: this.numOfRounds,
      currentRoundIndex: this.currentRoundIndex,
      players: this.players,
      firstPlayer: this.firstPlayer,
      roundState: this.roundState,
      currentMultiplier: this.currentMultiplier,
      currentHost: this.currentHost,
      totalScore: this.totalScore,
      isEnd: this.isEnd,
    };
  }

  private _registerPlayer(name: string, isCheat: boolean, isCPU: boolean, playerType: PlayerType) {
    switch (playerType) {
      case PlayerType.Human:
        this.players.push(new HumanPlayer(name, isCheat, isCPU));
        break;
      case PlayerType.Random:
      default:
        this.players.push(new RandomPlayer(name, isCheat, isCPU));
        break;
    }
  }
}

export default Game;
