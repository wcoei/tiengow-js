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

  constructor(playerRegisters: PlayerRegister[], numOfRounds: number = 100) {
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

  public registerPlayers_bak(name: string, isCheat: boolean, isCPU: boolean) {
    if (isCPU) {
      this.players.push(new RandomPlayer(name, isCheat, isCPU));
    } else {
      this.players.push(new HumanPlayer(name, isCheat, isCPU));
    }
  }

  public async start() {
    let name: string = await ask("Please enter your name: ");
    let useCheat: string = await ask("Use Cheat? (y/N): ");
    let isCPU: boolean = false;
    if (name == "") {
      isCPU = true;
      name = faker.name.findName();
    }
    this.registerPlayers_bak(name, useCheat.toLowerCase() == "y" ? true : false, isCPU);
    for (var i = 0; i < 3; i++) {
      this.registerPlayers_bak(faker.name.findName(), useCheat.toLowerCase() == "y" ? true : false, true);
    }
    this.players.forEach((player) => {
      console.log(`Name: ${player.name}`);
    });

    for (var r = 0; r < this.numOfRounds; r++) {
      this.currentRoundIndex = r;

      const round: Round = new Round(this.players, this.currentHost, this.currentMultiplier);
      this.roundState = round.getRoundState();
      console.clear();
      console.log(`Round ${r + 1} start.`);
      this.displayState(this.roundState);

      while (!this.roundState!.isEnd) {
        let myOnHandDeck = this.roundState.onHandDecks![this.roundState!.currentPlayer];
        if (this.roundState!.currentPlayer == 0 && !this.players[this.roundState!.currentPlayer].isCPU) {
          let pickedIndex: number[] = [];
          let pickedTiles: Tiles[] = [];
          do {
            let isInputValid: boolean = true;
            const inputString = await ask('Wait for your action, e.g "1 2 5": ');
            if (inputString.trim() == "") {
              console.log(`Your input is empty. `);
              continue;
            }
            const inputNumbers = inputString.split(" ");
            for (let i = 0; i < inputNumbers.length; i++) {
              if (isNaN(Number(inputNumbers[i]))) {
                console.log(`You should input digits. `);
                isInputValid = false;
                break;
              }
              let digit: number = Number.parseInt(inputNumbers[i]);
              if (digit > myOnHandDeck!.length || digit < 1) {
                console.log(`You should choose tiles from position 1 to ${myOnHandDeck.length}. `);
                isInputValid = false;
                break;
              }
              if (digit in pickedIndex) {
                console.log(`You should not input duplicated digits. `);
                isInputValid = false;
                break;
              }
              pickedIndex.push(digit);
            }
            if (isInputValid) {
              pickedTiles = pickedIndex.map((i) => myOnHandDeck![i - 1]).sort((tile1, tile2) => tile1!.id - tile2!.id)!;
            } else {
              pickedIndex = [];
            }
          } while (pickedTiles.length <= 0);
          let actionResponse = this.players[this.roundState!.currentPlayer].getAction(pickedTiles, this.roundState);
          const result = round.step(actionResponse);
          console.log("***" + result.message);
          if (!result.isSuccess) {
            console.log(result.message);
            await ask("");
          }
        } else {
          let actionResponse = this.players[this.roundState!.currentPlayer].autoAction(this.roundState);
          const result = round.step(actionResponse);
          if (!result.isSuccess) {
            console.log(result.message);
            await ask("");
          }
        }

        this.roundState = round.getRoundState();
        this.displayState(this.roundState);

        if (this.roundState!.isEnd) {
          this.firstPlayer = this.roundState!.roundResult!.winner;
          this.totalScore = this.totalScore.map(
            (score, i) => (score += this.roundState!.roundResult!.payout[i] + this.roundState!.roundResult!.bonus[i])
          );
          this.displayState(this.roundState!);
          if (this.currentHost == this.roundState!.roundResult!.winner) {
            this.currentMultiplier++;
          } else {
            this.currentHost = this.roundState!.roundResult!.winner;
            this.currentMultiplier = 2;
          }
        }
        //wait if not all players are robots
        if (this.players.find((player) => !player.isCPU)) {
          await ask("");
        }
      }
    }
  }

  displayState(state: RoundState) {
    console.clear();
    console.log(`Turn: ${state.turnProgress + 1}/4`);
    console.log(
      `Current Player: ${state.currentPlayer}; Current Host: ${state!.hostPlayer}; Multiplier:  ${state.multiplier}`
    );
    if (state == undefined) {
      return;
    }
    console.log("\nPlayer shown Tites: ");
    if (this.players[0].isCheat) {
      state!.onHandDecks!.forEach((deck, i) => {
        console.log(
          `\tPlayer ${i} (${state.playerPiles[i]}): ${deck.map((tile, i) => `${i + 1}:${tile.code}`).join(", ")}`
        );
      });
    } else {
      state.shownDecks!.forEach((deck, i) => {
        console.log(
          `\tPlayer ${i} (${state.playerPiles[i]}): ${deck.map((tile, i) => `${i + 1}:${tile.code}`).join(", ")}`
        );
      });
    }

    console.log("\nLast turn actions:");
    state.turnPlayerActions.forEach((action, i) => {
      console.log(
        `\t${i}--Player ${action.playerId} action: ${action.combination.type}; tiles: [${
          action.tiles ? action.tiles.map((tiles) => tiles.code).join(", ") : "NOT SHOWN"
        }] `
      );
    });

    console.log(
      `\nMy Deck: ${state.playerDecks![state.currentPlayer]?.map((tile, i) => `${i + 1}:${tile.code}`).join(", ")}`
    );

    if (state.roundResult !== undefined) {
      console.log(`\nWinner is ${state.roundResult.winner}`);
      for (let i = 0; i < this.players.length; i++) {
        console.log(
          `\tPlayer ${i}: gain: ${state.roundResult.payout[i]} (${state.roundResult.bonus[i]})\ttotal:${this.totalScore[i]}`
        );
      }
    }
  }
}

export default Game;
