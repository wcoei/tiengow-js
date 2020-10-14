import { ask } from "../common/util";
import Game from "../engine/game";
import PlayerRegister from "../types/playerRegister";
import PlayerType from "../types/playerType";

import faker from "faker";
import GameState from "../types/gameState";

class TerminalRunner {
  private _myPlayerId = 0;

  public async run() {
    let playerRegisters = await this.getPlayersFromConsole();

    const game = new Game(playerRegisters);
    //game.start();
  }

  displayState(state: GameState) {
    let roundState = state.roundState!;
    if (roundState != undefined) {
      console.clear();

      console.log(`Turn: ${roundState.turnProgress + 1}/4`);
      console.log(
        `Current Player: ${roundState.currentPlayer}; Current Host: ${roundState!.hostPlayer}; Multiplier:  ${
          roundState.multiplier
        }`
      );
      console.log("\nPlayer shown Tites: ");
      if (roundState.onHandDecks) {
        roundState!.onHandDecks!.forEach((deck, i) => {
          console.log(
            `\tPlayer ${i} (${roundState.playerPiles[i]}): ${deck.map((tile, i) => `${i + 1}:${tile.code}`).join(", ")}`
          );
        });
      } else {
        roundState.shownDecks!.forEach((deck, i) => {
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

      console.log(
        `\nMy Deck: ${roundState
          .playerDecks![roundState.currentPlayer]?.map((tile, i) => `${i + 1}:${tile.code}`)
          .join(", ")}`
      );

      if (roundState.roundResult !== undefined) {
        console.log(`\nWinner is ${roundState.roundResult.winner}`);
        for (let i = 0; i < state.players.length; i++) {
          console.log(
            `\tPlayer ${i}: gain: ${roundState.roundResult.payout[i]} (${roundState.roundResult.bonus[i]})\ttotal:${state.totalScore[i]}`
          );
        }
      }
    }
  }

  async getPlayersFromConsole(): Promise<PlayerRegister[]> {
    let name: string = await ask("Please enter your name: ");
    let useCheat: string = await ask("Use Cheat? (y/N): ");
    let isCPU: boolean = false;
    let isCheat: boolean = useCheat.toLowerCase() == "y" ? true : false;
    let playerType: PlayerType = PlayerType.Human;
    let players: PlayerRegister[] = [];

    //if name is not inputted, all players are robots
    if (name == "") {
      isCPU = true;
      name = faker.name.findName();
      playerType = PlayerType.Random;
    }
    players.push({ name, isCPU, isCheat, playerType });

    for (var i = 0; i < 3; i++) {
      players.push({ name: faker.name.findName(), isCPU: true, isCheat, playerType: PlayerType.Random });
    }

    return new Promise((resolve) => resolve(players));
  }
}

export default TerminalRunner;
