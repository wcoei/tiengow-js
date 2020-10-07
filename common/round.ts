import _ from "lodash";
import Deck from "../types/deck";
import Tiles from "../types/tile";
import Player from "./player";

class Round {
  public decks: Deck = new Deck();
  public isEnd: boolean = false;
  public players: Player[];
  public firstPlayer: number = 0;
  public multiplier: number = 1;
  public playerDecks: Tiles[][] = this.decks.playerDecks;
  public onHandDecks: Tiles[][] = _.cloneDeep(this.playerDecks);
  public shownDecks: Tiles[][] = [[], [], [], []];
  //public actions:
  public currentPlayer: number = this.firstPlayer;

  constructor(players: Player[], firstPlayer: number, multiplier: number) {
    this.players = players;
    this.firstPlayer = firstPlayer;
    this.multiplier = multiplier;
  }

  step(action: string) {
    let actionTiles = [this.onHandDecks[this.currentPlayer].pop()];
    console.log(
      `Player: ${this.players[this.currentPlayer].name}; Action: ${
        actionTiles[0]!.id
      }`
    );

    this.currentPlayer = (this.currentPlayer + 1) % 4;
    if (_.flatten(this.onHandDecks).length == 0) {
      this.isEnd = true;
    }
  }

  obs(playerId: number) {
    return {
      playerDecks: this.players[playerId].isCheat
        ? this.playerDecks
        : undefined,
      shownDecks: this.shownDecks,
      onHandDecks: this.players[playerId].isCheat
        ? this.playerDecks
        : undefined,
      lastAction: undefined,
    };
  }
}

export default Round;
