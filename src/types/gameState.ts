import RoundState from "./roundState";
import Player from "../player/player";
import Tile from "./tile";

interface GameState {
  numOfRounds: number;
  currentRoundIndex: number;
  players: Player[];
  roundState?: RoundState;
  firstPlayer: number;
  currentMultiplier: number;
  currentHost: number;
  totalScore: number[];
  isEnd: boolean;
  myOnHandDeck: Tile[];
}

export default GameState;