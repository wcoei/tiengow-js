import faker from "faker";

import Round from "./round";
import Player from "../types/player";
import State from "../types/state";
import Tiles from "../types/tile";
import { ask, sleep } from "./util";

class Game {
  public numOfRounds = 8;
  public currentRoundIndex = 0;
  public rounds: Round[] = [];
  public players: Player[] = [];
  public state?: State;
  public myPlayerId: number = 0;
  public firstPlayer: number = 0;
  public currentMultiplier = 1;
  public currentHost = 0;
  public totalScore = [0, 0, 0, 0];

  constructor({ numOfRounds }: { numOfRounds?: number }) {
    this.numOfRounds = numOfRounds!;
    // throw dice and get the first player
    this.firstPlayer = Math.floor(Math.random() * 4);
    this.currentHost = this.firstPlayer;
  }

  public registerPlayers(name: string, isCheat: boolean, isCPU: boolean) {
    this.players.push(new Player(name, isCheat, isCPU));
  }

  public async start() {
    let name: string = await ask("Please enter your name: ");
    let useCheat: string = await ask("Use Cheat? (y/N): ");
    let isCPU: boolean = false;
    if (name == "") {
      isCPU = true;
      name = faker.name.findName();
    }
    this.registerPlayers(
      name,
      useCheat.toLowerCase() == "y" ? true : false,
      isCPU
    );
    for (var i = 0; i < 3; i++) {
      this.registerPlayers(
        faker.name.findName(),
        useCheat.toLowerCase() == "y" ? true : false,
        isCPU
      );
    }
    this.players.forEach((player) => {
      console.log(`Name: ${player.name}`);
    });

    for (var r = 0; r < this.numOfRounds; r++) {
      this.currentRoundIndex = r;

      const round: Round = new Round(
        this.players,
        this.currentHost,
        this.currentMultiplier
      );
      this.state = round.getState(this.myPlayerId);
      console.clear();
      console.log(`Round ${r + 1} start.`);

      while (!this.state.isEnd) {
        this.displayState();
        if (
          this.state.currentPlayer == 0 &&
          !this.players[this.state.currentPlayer].isCPU
        ) {
          let pickedIndex: number[] = [];
          let pickedTiles: Tiles[] = [];
          do {
            let isInputValid: boolean = true;
            const inputString = await ask(
              'Wait for your action, e.g "1 2 5": '
            );
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
              if (digit > this.state.myOnHandDeck!.length || digit < 1) {
                console.log(
                  `You should choose tiles from position 1 to ${
                    this.state.myOnHandDeck!.length
                  }. `
                );
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
              pickedTiles = pickedIndex
                .map((i) => this.state!.myOnHandDeck![i - 1])
                .sort((tile1, tile2) => tile1!.id - tile2!.id)!;
            } else {
              pickedIndex = [];
            }
          } while (pickedTiles.length <= 0);
          const result = round.step(pickedTiles);
          console.log("***" + result.message);
          if (!result.isSuccess) {
            console.log(result.message);
            await ask("");
          }
        } else {
          const result = round.step();
          console.log("***" + result.message);
          if (!result.isSuccess) {
            console.log(result.message);
            await ask("");
          }
        }

        this.state = round.getState(0);

        if (this.state.isEnd) {
          this.firstPlayer = this.state.roundResult!.winner;
          this.totalScore = this.totalScore.map(
            (score, i) =>
              (score +=
                this.state!.roundResult!.payout[i] +
                this.state!.roundResult!.bonus[i])
          );
          this.displayState();
          if (this.currentHost == this.state!.roundResult!.winner) {
            this.currentMultiplier++;
          } else {
            this.currentHost = this.state!.roundResult!.winner;
            this.currentMultiplier = 2;
          }
          await sleep(500);
        } else {
          await sleep(10);
        }
      }
    }
  }

  displayState() {
    console.clear();
    console.log(`Turn: ${this.state!.turnProgress + 1}/4`);
    console.log(
      `Current Player: ${this.state!.currentPlayer}; Current Host: ${
        this.state!.hostPlayer
      }; Multiplier:  ${this.state!.multiplier}`
    );
    if (this.state == undefined) {
      return;
    }
    console.log("\nPlayer shown Tites: ");
    if (this.players[0].isCheat) {
      this.state!.onHandDecks!.forEach((deck, i) => {
        console.log(
          `\tPlayer ${i} (${this.state?.playerPiles[i]}): ${deck
            .map((tile, i) => `${i + 1}:${tile.code}`)
            .join(", ")}`
        );
      });
    } else {
      this.state!.shownDecks!.forEach((deck, i) => {
        console.log(
          `\tPlayer ${i} (${this.state?.playerPiles[i]}): ${deck
            .map((tile, i) => `${i + 1}:${tile.code}`)
            .join(", ")}`
        );
      });
    }

    console.log("\nLast turn actions:");
    this.state.turnPlayerActions.forEach((action, i) => {
      console.log(
        `\t${i}--Player ${action.playerId} action: ${
          action.combination.type
        }; tiles: [${
          action.tiles
            ? action.tiles.map((tiles) => tiles.code).join(", ")
            : "NOT SHOWN"
        }] `
      );
    });

    console.log(
      `\nMy Deck: ${this.state.myOnHandDeck
        ?.map((tile, i) => `${i + 1}:${tile.code}`)
        .join(", ")}`
    );

    if (this.state.roundResult !== undefined) {
      console.log(`\nWinner is ${this.state.roundResult.winner}`);
      for (let i = 0; i < this.players.length; i++) {
        console.log(
          `\tPlayer ${i}: gain: ${this.state.roundResult.payout[i]} (${this.state.roundResult.bonus[i]})\ttotal:${this.totalScore[i]}`
        );
      }
    }
  }
}

export default Game;
