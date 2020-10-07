
import Tiles from "./tile";
import Militaries from "./military";
import Suits from "./suit";
import Civils from "./civil";

const tileSet: Tiles[] = [
  { id: 0, code: "HEAVEN1" , suit: Suits.Civil, rank: Civils.Heaven },
  { id: 1, code: "HEAVEN2", suit: Suits.Civil, rank: Civils.Heaven },
  { id: 2, code: "EARTH1", suit: Suits.Civil, rank: Civils.Earth },
  { id: 3, code: "EARTH2", suit: Suits.Civil, rank: Civils.Earth },
  { id: 4, code: "MAN1", suit: Suits.Civil, rank: Civils.Man },
  { id: 5, code: "MAN2", suit: Suits.Civil, rank: Civils.Man },
  { id: 6, code: "HARMONY1", suit: Suits.Civil, rank: Civils.Harmony },
  { id: 7, code: "HARMONY2", suit: Suits.Civil, rank: Civils.Harmony },
  { id: 8, code: "PLUM1", suit: Suits.Civil, rank: Civils.PlumFlower },
  { id: 8, code: "PLUM2", suit: Suits.Civil, rank: Civils.PlumFlower },
  { id: 10, code: "LONG1", suit: Suits.Civil, rank: Civils.LongThree },
  { id: 11, code: "LONG2", suit: Suits.Civil, rank: Civils.LongThree },
  { id: 12, code: "BENCH1", suit: Suits.Civil, rank: Civils.Bench },
  { id: 13, code: "BENCH2", suit: Suits.Civil, rank: Civils.Bench },
  { id: 14, code: "TIGER1", suit: Suits.Civil, rank: Civils.TigersHead },
  { id: 15, code: "TIGER2", suit: Suits.Civil, rank: Civils.TigersHead },
  { id: 16, code: "TEN1", suit: Suits.Civil, rank: Civils.RedHeadTen },
  { id: 17, code: "TEN2", suit: Suits.Civil, rank: Civils.RedHeadTen },
  { id: 18, code: "LEG1", suit: Suits.Civil, rank: Civils.LongLegSeven },
  { id: 19, code: "LEG2", suit: Suits.Civil, rank: Civils.LongLegSeven },
  { id: 20, code: "MALLET1", suit: Suits.Civil, rank: Civils.RedMalletSix },
  { id: 21, code: "MALLET2", suit: Suits.Civil, rank: Civils.RedMalletSix },
  { id: 22, code: "NINE1", suit: Suits.Military, rank: Militaries.Nine },
  { id: 23, code: "NINE2", suit: Suits.Military, rank: Militaries.Nine },
  { id: 24, code: "EIGHT1", suit: Suits.Military, rank: Militaries.Eight },
  { id: 25, code: "EIGHT2", suit: Suits.Military, rank: Militaries.Eight },
  { id: 26, code: "SEVEN1", suit: Suits.Military, rank: Militaries.Seven },
  { id: 27, code: "SEVEN1", suit: Suits.Military, rank: Militaries.Seven },
  { id: 28, code: "FIVE1", suit: Suits.Military, rank: Militaries.Five },
  { id: 29, code: "FIVE2", suit: Suits.Military, rank: Militaries.Five },
  { id: 30, code: "SIX1", suit: Suits.Military, rank: Militaries.Six },
  { id: 31, code: "THREE1", suit: Suits.Military, rank: Militaries.Three },
];

export default tileSet;