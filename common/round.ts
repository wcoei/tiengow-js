import Deck from "../types/deck";
import Player from "./player";

class Round {
  public decks: Deck = new Deck();
  public isEnd: boolean = false;
  public players: Player[];
  public firstPlayer: number=0;
  public multiplier: number=1;

  constructor(players: Player[], firstPlayer: number, multiplier: number) {
    this.players = players;
    this.firstPlayer = firstPlayer;
    this.firstPlayer = multiplier;
  }

  start() {
    this.decks.playerDecks.forEach((deck, i) => {
      this.players[i].getNewDeck(deck);
    });
  }
}

export default Round;