import Tiles from "../types/tile";

abstract class Players {
  public name: string;
  public isCheat: boolean;
  public isCPU: boolean;

  constructor(name: string, isCheat: boolean, isCPU: boolean) {
    this.name = name;
    this.isCheat = isCheat;
    this.isCPU = isCPU;
  }

  public autoAction() {

  }
}

export default Players;
