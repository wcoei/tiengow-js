import faker from "faker";

import Round from "./round";
import Player from "./player";
import { ask } from "./util";

class Game {
  public numOfRounds;
  public rounds: Round[] = [];
  public players: Player[] = [];

  constructor({ numOfRounds }: { numOfRounds?: number }) {
    this.numOfRounds = numOfRounds ?? 3;
  }

  public registerPlayers(name: string, isCheat: boolean, isCPU: boolean) {
    this.players.push(new Player(name, isCheat, isCPU));
  }

  public async start() {
    while (this.players.length < 4) {
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
    }
    const round: Round = new Round(this.players, 0, 1);
    round.start();
  }
}

export default Game;
