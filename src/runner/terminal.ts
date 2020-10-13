import Game from "../engine/game";

async function runner() {
  const game = new Game({ numOfRounds: 10 });
  game.start();
}

export default runner;