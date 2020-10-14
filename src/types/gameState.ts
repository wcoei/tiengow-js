import RoundState from "./roundState";
import Player from "../player/player";

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
}

export default GameState;