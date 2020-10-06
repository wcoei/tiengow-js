import Suit from './suit';
import Civils from './civil';
import Militaries from './military';
import Suits from './suit';

interface Tile {
  id: number,
  suit: Suits,
  rank: Civils | Militaries,
}
export default Tile;