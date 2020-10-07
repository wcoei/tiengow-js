import faker from "faker";

import Round from "./round";
import Player from "../types/player";
import State from "../types/state";
import Tiles from "../types/tile";
import { ask } from "./util";

class Game {
  public numOfRounds = 2;
  public currentRoundIndex = 0;
  public rounds: Round[] = [];
  public players: Player[] = []; 
  public state?: State;
  public myPlayerId: number = 0;

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
      this.currentRoundIndex = r;
      
      const round: Round = new Round(this.players, 0, 1);
      this.state = round.getState(this.myPlayerId);
      console.clear();
      console.log(`Round ${r + 1} start.`);
      this.displayState();

      while (!round.isEnd) {
        if (round.currentPlayer == 0) {
          await ask('Wait for your action: e.g "1 2 5"');
        }
        //check action legal or not 
        round.step("");
      }
      this.rounds.push(round);
    }
  }
  displayState() {
    console.log(this.state?.myOnHandDeck?.map(tile => tile.code).join(", "));
  }
}

export default Game;
