import Game from "./common/game";

async function main() {
  const game = new Game({ numOfRounds: 10 });
  game.start();
}

main();
