import faker from "faker";

import { ask, sleep } from "../common/util";
import Game from "../engine/game";
import PlayerRegister from "../types/playerRegister";
import PlayerType from "../types/playerType";
import GameState from "../types/gameState";
import Tile from "../types/tile";
import { result } from "lodash";

class TerminalRunner {
  private _myPlayerId = 0;
  private state: GameState | undefined;

  public async run() {
    let playerRegisters = await this._getPlayersFromConsole();

    const game = new Game(playerRegisters, 100);
    this.state = game.getGameState(this._myPlayerId);
    this._displayState(this.state);
    while (!this.state.isEnd) {
      // only non robot players needs manual input
      if (
        this.state.roundState!.currentPlayer != this._myPlayerId ||
        this.state.players[this.state.roundState!.currentPlayer].isCPU
      ) {
        const result = game.step();
        if (!result.isSuccess) {
          console.log(result.message);
          continue;
        }
      } else {
        let inputTiles = await this._getInputTilesFromConsole(this.state);
        const result = game.step(inputTiles);
        if (!result.isSuccess) {
          console.log(result.message);
          continue;
        }
      }
      this.state = game.getGameState(this._myPlayerId);
      this._displayState(this.state);
      if (this.state.roundState!.isEnd || this.state.roundState!.isTurnEnd) {
        //await ask("Press enter to continue");
        if (this.state.players.find((player) => !player.isCPU)) {
          await ask("Press enter to continue. ");
        }
        await sleep(10);
        const result = game.step();
        this.state = game.getGameState(this._myPlayerId);
        this._displayState(this.state);
      }
      await sleep(10);
    }
  }
  private async _getInputTilesFromConsole(state: GameState): Promise<Tile[]> {
    let pickedIndex: number[] = [];
    let pickedTiles: Tile[] = [];
    do {
      let isInputValid: boolean = true;
      const inputString = await ask('Wait for your action, input index of tiles seperated with comma, e.g "1,2,5": ');
      if (inputString.trim() == "") {
        console.log(`Your input is empty. `);
        continue;
      }
      const inputNumbers = inputString.trim().split(",");
      for (let i = 0; i < inputNumbers.length; i++) {
        if (inputNumbers[i] == "") {
          continue;
        }
        if (isNaN(Number(inputNumbers[i]))) {
          console.log(`You should input digits. `);
          isInputValid = false;
          break;
        }
        let digit: number = Number.parseInt(inputNumbers[i]);
        if (digit > state.myOnHandDeck!.length || digit < 1) {
          console.log(`You should choose tiles from position 1 to ${state.myOnHandDeck.length}. `);
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
        pickedTiles = pickedIndex.map((i) => state.myOnHandDeck![i - 1]).sort((tile1, tile2) => tile1!.id - tile2!.id)!;
      } else {
        pickedIndex = [];
      }
    } while (pickedTiles.length <= 0);
    return new Promise((resolve) => resolve(pickedTiles));
  }
  private _displayState(state: GameState) {
    console.clear();
    console.log(`Round: ${state.currentRoundIndex + 1}`);
    let roundState = state.roundState!;
    if (roundState != undefined) {
      console.log(`Turn: ${roundState.turnProgress + 1}/4`);
      console.log(
        `Current Player: ${roundState.currentPlayer}; Current Host: ${roundState!.hostPlayer}; Multiplier:  ${
          roundState.multiplier
        }`
      );
      console.log("\nPlayer shown tites: ");
      roundState.shownDecks!.forEach((deck, i) => {
        console.log(
          `\tPlayer ${i} (${roundState.playerPiles[i]}): ${deck.map((tile, i) => `${i + 1}:${tile.code}`).join(", ")}`
        );
      });

      console.log("\nPlayer on hand tites: ");
      if (roundState.onHandDecks) {
        roundState!.onHandDecks!.forEach((deck, i) => {
          console.log(
            `\tPlayer ${i} (${roundState.playerPiles[i]}): ${deck.map((tile, i) => `${i + 1}:${tile.code}`).join(", ")}`
          );
        });
      }

      console.log("\nLast turn actions:");
      roundState.turnPlayerActions.forEach((action, i) => {
        console.log(
          `\t${i}--Player ${action.playerId} action: ${action.combination.type}; tiles: [${
            action.tiles ? action.tiles.map((tiles) => tiles.code).join(", ") : "NOT SHOWN"
          }] `
        );
      });

      console.log(`\nMy Deck: ${state.myOnHandDeck.map((tile, i) => `${i + 1}:${tile.code}`).join(", ")}`);

      if (roundState.roundResult) {
        console.log(`\nWinner is ${roundState.roundResult.winner}`);
        for (let i = 0; i < state.players.length; i++) {
          console.log(
            `\tPlayer ${i}: gain: ${roundState.roundResult.payout[i]} (${roundState.roundResult.bonus[i]})\ttotal:${state.totalScore[i]}`
          );
        }
      }
      if (roundState.isTurnEnd && !roundState.roundResult) {
        console.log(`\nTurn winner is ${roundState.turnWinningAction?.playerId}`);
      }
    }
  }

  private async _getPlayersFromConsole(): Promise<PlayerRegister[]> {
    let name: string = await ask("Please enter your name: ");
    let useCheat: string = await ask("Use Cheat? (y/N): ");
    let isCPU: boolean = false;
    let isCheat: boolean = useCheat.toLowerCase() == "y" ? true : false;
    let playerType: PlayerType = PlayerType.Human;
    let players: PlayerRegister[] = [];

    // if name is not inputted, all players are robots
    if (name == "") {
      isCPU = true;
      name = faker.name.findName();
      playerType = PlayerType.Random;
    }
    players.push({ name, isCPU, isCheat, playerType });

    // create robot record for the remaining three players
    for (var i = 0; i < 3; i++) {
      players.push({
        name: faker.name.findName(),
        isCPU: true,
        isCheat,
        playerType: PlayerType.Random,
      });
    }

    return new Promise((resolve) => resolve(players));
  }
}

export default TerminalRunner;
