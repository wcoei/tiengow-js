import faker from "faker";

import Round from "./round";
import Player from "./player";
import { ask } from "./util";
import { setPriority } from "os";

class Game {
  public numOfRounds = 2;
  public currentRound = 0;
  public rounds: Round[] = [];
  public players: Player[] = [];

  constructor({ numOfRounds }: { numOfRounds?: number }) {
    this.numOfRounds = numOfRounds!;
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
      console.log(`Round ${r + 1} start.`);
      const round: Round = new Round(this.players, 0, 1);
      while (!round.isEnd) {
        if (round.currentPlayer == 0) {
          await ask('Wait for your action: e.g "1 2 5"');
        }
        round.step("");
      }
    }
  }
}

export default Game;
