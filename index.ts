import Game from "./common/game";
import { pickRandomNumbers} from "./common/util";

async function main() {
  const game = new Game({ numOfRounds: 10000 });
  game.start();
}

main();
