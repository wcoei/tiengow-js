import _ from "lodash";

import Tiles from "./tile";
import Militaries from "./military";
import Suits from "./suit";
import Civils from "./civil";
import TileSet from "./tileSet";

class Deck {
  public playerDecks: Tiles[][];

  constructor() {
    this.playerDecks = this.newDecks();
  }

  
  newDecks(): Tiles[][] {
    let shuffuledSet: Tiles[] = this._shuffle(TileSet);
    return _.chunk(shuffuledSet, 8).map(playerDeck => {
      return playerDeck.sort((tile1, tile2) => tile1.id - tile2.id )
    });
  }

  private _shuffle(array: Tiles[]) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  showDecks(): void {
    this.playerDecks.forEach((playerTiles: Tiles[]) => {
      console.log(
        playerTiles.map((tile) => {
          return tile.id;
        }).join(",")
      );
    });
  }
}

export default Deck;
