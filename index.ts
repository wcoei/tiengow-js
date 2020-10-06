import ask from './util';
import Deck from './types/deck'

async function main() {
  var name = await ask("What's you name? ");
  console.log(`Nice to meet you ${name}`);

  const currentDeck = new Deck();
  currentDeck.shuffleDeck();
  console.clear();
  currentDeck.showDeck();

}

main();
