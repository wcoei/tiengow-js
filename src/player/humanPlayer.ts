import Player from "./player";

class HumanPlayer extends Player {
  constructor(name: string, isCheat: boolean, isCPU: boolean) {
   super(name, isCheat, isCPU);
  }
}

export default HumanPlayer;