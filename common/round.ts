import _ from "lodash";
import Deck from "../types/deck";
import Tiles from "../types/tile";
import Player from "../types/player";
import State from "../types/state";
import Action from "../types/action";

class Round {
  public decks: Deck = new Deck();
  public isEnd: boolean = false;
  public players: Player[];
  public multiplier: number = 1;
  public playerDecks: Tiles[][] = this.decks.playerDecks;
  public onHandDecks: Tiles[][] = _.cloneDeep(this.playerDecks);
  public shownDecks: Tiles[][] = [[], [], [], []];
  public currentPlayer: number;
  public currentHouse: number;
  public turnPlayerActions: Action[] = [];
  public turnWinningAction?: Action = undefined;

  constructor(players: Player[], firstPlayer: number, multiplier: number) {
    this.players = players;
    this.currentPlayer = firstPlayer;
    this.currentHouse = firstPlayer;
    this.multiplier = multiplier;
  }

  step(action: string) {
    //TODO: check action is legal or not
    //TODO: if action is illegal, then return
    

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

  getState(playerId: number): State {
    return {
      currentHouse: this.currentHouse,
      currentPlayer: this.currentPlayer,
      multiplier: this.multiplier,
      playerDecks: this.players[playerId].isCheat
        ? this.playerDecks
        : undefined,
      shownDecks: this.shownDecks,
      onHandDecks: this.players[playerId].isCheat
        ? this.playerDecks
        : undefined,
      myOnHandDeck: this.playerDecks[playerId],
      turnPlayerActions: [],
      turnWinningAction: this.turnWinningAction,
    };
  }
}

export default Round;
