import Tiles from "../types/tile";

class Player {
  public name: string;
  public isCheat: boolean;
  public isCPU: boolean;
  public deck: Tiles[] = [];

  constructor(name: string, isCheat: boolean, isCPU: boolean) {
    this.name = name;
    this.isCheat = isCheat;
    this.isCPU = isCPU;
  }

  getNewDeck(deck: Tiles[]) {
    this.deck = deck;
  }
}

export default Player;
