import _ from "lodash";

import Tiles from "./tile";
import Militaries from "./military";
import Suits from "./suit";
import Civils from "./civil";
import tileSet from "./tileSet";
import combintations from "./combination";
import combinations from "./combination";

class Deck {
  public playerDecks: Tiles[][];

  constructor() {
    this.playerDecks = this.newDecks();
  }

  newDecks(): Tiles[][] {
    let shuffuledSet: Tiles[] = this._shuffle(tileSet);
    return _.chunk(shuffuledSet, 8).map((playerDeck) => {
      return playerDeck.sort((tile1, tile2) => tile1.id - tile2.id);
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
        playerTiles
          .map((tile) => {
            return tile.id;
          })
          .join(",")
      );
    });
  }

  getLegalCombination() {
    let tiles = this.playerDecks[0];
    let combos = [];
    let temp = [];
    let slent = Math.pow(2, tiles.length);

    for (let i = 0; i < slent; i++) {
      temp = [];
      for (let j = 0; j < tiles.length; j++) {
        if (i & Math.pow(2, j)) {
          temp.push(tiles[j]);
        }
      }
      if (temp.length > 0) {
        combos.push(temp);
      }
    }

    let legalCombos = combos
      .sort((a, b) => b.length - a.length)
      .map((combo) => {
        return {
          code: combo.map((tile) => tile.code).join("_"),
          tiles: combo,
        };
      })
      .map((combo) => {
        return {
          combination: combinations.find(
            (element) => element.code == combo.code
          ),
          tiles: combo.tiles,
        };
      })
      .filter((combo) => combo.combination != undefined);
    legalCombos.forEach((combo) => {
      console.log(
        `${combo.combination?.code}(${
          combo.combination?.type
        }): ${combo.tiles.map((tile) => tile.code).join(", ")}`
      );
    });
  }
}

export default Deck;
