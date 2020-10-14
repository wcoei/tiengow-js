import Tiles from "./tile";
import Action from "./action";
import RoundResult from "./roundResult";

interface RoundState {
  hostPlayer: number;
  currentPlayer: number;
  multiplier: number;
  playerDecks?: Tiles[][];
  shownDecks?: Tiles[][];
  onHandDecks?: Tiles[][];
  turnPlayerActions: Action[];
  turnWinningAction?: Action;
  playerPiles: number[];
  turnProgress: number;
  isEnd: boolean;
  roundResult?: RoundResult;
  isTurnEnd: boolean;
}

export default RoundState;
