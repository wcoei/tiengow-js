import Tiles from "./tile";

class Player {
  public name: string;
  public isCheat: boolean;
  public isCPU: boolean;

  constructor(name: string, isCheat: boolean, isCPU: boolean) {
    this.name = name;
    this.isCheat = isCheat;
    this.isCPU = isCPU;
  }
}

export default Player;
