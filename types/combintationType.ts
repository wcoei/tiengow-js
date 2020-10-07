import { countBy } from "lodash";

enum CombintationTypes {
  SingleCivil,
  SingleMilitary,
  DoubleCivil, 
  DoubleMilitary, 
  PrimeCivil,
  PrimeMilitary,
  TripletCivilPair,
  TripletMilitaryPair,
  Quadruple
}

export default CombintationTypes;