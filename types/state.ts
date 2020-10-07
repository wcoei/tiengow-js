import Tiles from './tile';
import Action from './action'
import ActionTypes from './actionTypes';

interface State
{
  currentPlayer: number;
  currentHouse: number;
  multiplier: number;
  playerDecks?: Tiles[][];
  shownDecks?: Tiles[][];
  onHandDecks?: Tiles[][];
  myOnHandDeck?: Tiles[],
  turnPlayerActions: Action[];
  turnWinningAction?: Action;
};

export default State;