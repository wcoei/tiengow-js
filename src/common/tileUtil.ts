import Tile from "../types/tile";
import Action from "../types/action";
import CombinationTypes from "../types/combinationType";
import tileCombinations, { combinationDetail } from "../types/combination";

export function getAllLegalCombinationFromTiles(deck: Tile[]): { combination: combinationDetail | undefined; tiles: Tile[] }[] {
  let tiles = deck;
  let combos: Tile[][] = [];
  let temp: Tile[] = [];
  let slent = Math.pow(2, tiles.length);

  //generate all combination based on deck argument
  for (let i = 0; i < slent; i++) {
    temp = [];
    for (let j = 0; j < tiles.length; j++) {
      if (i & Math.pow(2, j)) {
        temp.push(tiles[j]);
      }
    }
    if (temp.length > 0) {
      combos.push(temp);
    }
  }

  //restructure the comnination and add code and combination fields
  let legalCombos = combos
    .sort((a, b) => b.length - a.length)
    .map((combo) => {
      return {
        code: combo.map((tile) => tile.code).join("_"),
        tiles: combo,
      };
    })
    .map((combo) => {
      return {
        combination: tileCombinations.find(
          (element) => element.code == combo.code
        ),
        tiles: combo.tiles,
      };
    })
    .filter((combo) => combo.combination != undefined);

  return legalCombos;
}

export function getWinningAction(actions: Action[]): Action | undefined {
  if (actions != undefined && actions.length > 0) {
    return actions
      .filter((element) => element.combination.type != CombinationTypes.Pass)
      .sort((element1, element2) => element1.combination.rank - element2.combination.rank)[0];
  }
  return undefined;
}