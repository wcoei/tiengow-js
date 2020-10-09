import Tiles from './tile';
import Action from './action';
import RoundResult from './roundResult';

interface State
{
  hostPlayer: number;
  currentPlayer: number;
  multiplier: number;
  playerDecks?: Tiles[][];
  shownDecks?: Tiles[][];
  onHandDecks?: Tiles[][];
  myOnHandDeck?: Tiles[],
  turnPlayerActions: Action[];
  turnWinningAction?: Action;
  playerPiles: number[];
  turnProgress: number;
  isEnd: boolean;
  roundResult?: RoundResult;
};

export default State;