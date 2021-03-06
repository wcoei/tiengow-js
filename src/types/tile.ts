import Militaries from "./military";
import Suits from "./suit";
import Civils from "./civil";

interface Tile {
  id: number;
  code: string;
  suit: Suits;
  rank: Civils | Militaries;
}

export default Tile;
