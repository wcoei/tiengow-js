#!/usr/bin/env node
import Game from "./common/game";

async function main() {
  const game = new Game({ numOfRounds: 10000 });
  game.start();
}

main();