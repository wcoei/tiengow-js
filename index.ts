import Game from "./common/game";
import Deck from "./types/deck";

async function main() {
  const game = new Game({ numOfRounds: 2 });
  const deck = new Deck();
  deck.getLegalCombination();
  //game.start();
}

main();
