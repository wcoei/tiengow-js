import PlayerType from "./playerType";

interface PlayerRegister {
  name: string, 
  isCheat: boolean,
  isCPU: boolean,
  playerType: PlayerType
}

export default PlayerRegister;