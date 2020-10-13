import Player from "./player";

class RandomPlayer extends Player {
  constructor(name: string, isCheat: boolean, isCPU: boolean) {
   super(name, isCheat, isCPU);
  }
}

export default RandomPlayer;