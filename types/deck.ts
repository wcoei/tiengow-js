import Tiles from "./tile";
import Civils from "./civil";
import Militaries from "./military";
import Suits from "./suit";
import Tile from "./tile";
import { title } from "process";

class Deck {
  tiles: Tiles[];

  constructor() {
    this.tiles = this.newDeck();
  }

  newDeck(): Tiles[] {
    return [
      { id: 0, suit: Suits.Civil, rank: Civils.Heaven },
      { id: 1, suit: Suits.Civil, rank: Civils.Heaven },
      { id: 2, suit: Suits.Civil, rank: Civils.Earth },
      { id: 3, suit: Suits.Civil, rank: Civils.Earth },
      { id: 4, suit: Suits.Civil, rank: Civils.Man },
      { id: 5, suit: Suits.Civil, rank: Civils.Man },
      { id: 6, suit: Suits.Civil, rank: Civils.Harmony },
      { id: 7, suit: Suits.Civil, rank: Civils.Harmony },
      { id: 8, suit: Suits.Civil, rank: Civils.PlumFlower },
      { id: 8, suit: Suits.Civil, rank: Civils.PlumFlower },
      { id: 10, suit: Suits.Civil, rank: Civils.LongThree },
      { id: 11, suit: Suits.Civil, rank: Civils.LongThree },
      { id: 12, suit: Suits.Civil, rank: Civils.Bench },
      { id: 13, suit: Suits.Civil, rank: Civils.Bench },
      { id: 14, suit: Suits.Civil, rank: Civils.TigersHead },
      { id: 15, suit: Suits.Civil, rank: Civils.TigersHead },
      { id: 16, suit: Suits.Civil, rank: Civils.RedHeadTen },
      { id: 17, suit: Suits.Civil, rank: Civils.RedHeadTen },
      { id: 18, suit: Suits.Civil, rank: Civils.LongLegSeven },
      { id: 19, suit: Suits.Civil, rank: Civils.LongLegSeven },
      { id: 20, suit: Suits.Civil, rank: Civils.RedMalletSix },
      { id: 21, suit: Suits.Civil, rank: Civils.RedMalletSix },
      { id: 22, suit: Suits.Military, rank: Militaries.Nine },
      { id: 23, suit: Suits.Military, rank: Militaries.Nine },
      { id: 24, suit: Suits.Military, rank: Militaries.Eight },
      { id: 25, suit: Suits.Military, rank: Militaries.Eight },
      { id: 26, suit: Suits.Military, rank: Militaries.Seven },
      { id: 27, suit: Suits.Military, rank: Militaries.Seven },
      { id: 28, suit: Suits.Military, rank: Militaries.Five },
      { id: 29, suit: Suits.Military, rank: Militaries.Five },
      { id: 30, suit: Suits.Military, rank: Militaries.Six },
      { id: 31, suit: Suits.Military, rank: Militaries.Three },
    ];
  }
  shuffleDeck(): void {
    function shuffle(array: any) {
      var currentIndex = array.length, temporaryValue, randomIndex;
    
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
    
    }
    shuffle(this.tiles);  
  }

  showDeck(): void {
    this.tiles.forEach((tile: Tile) => {
      console.log(
        `Tile ID: ${tile.id}; Suit: ${Suits[tile.suit]}; Rank: ${
          tile.suit == Suits.Civil ? Civils[tile.rank] : Militaries[tile.rank]
        } `
      );
    });
  }
}

export default Deck;
