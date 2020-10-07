import CombintationTypes from "./combintationType";
import ct from "./combintationType";

interface combinationDetail {
  code: string, type: ct, rank: number
}

const combinations: combinationDetail[] = [
  //SingleCivil
  { code: "HEAVEN1", type: ct.SingleCivil, rank: 0 },
  { code: "HEAVEN2", type: ct.SingleCivil, rank: 0 },
  { code: "EARTH1", type: ct.SingleCivil, rank: 1 },
  { code: "EARTH2", type: ct.SingleCivil, rank: 1 },
  { code: "MAN1", type: ct.SingleCivil, rank: 2 },
  { code: "MAN2", type: ct.SingleCivil, rank: 2 },
  { code: "HARMONY1", type: ct.SingleCivil, rank: 3 },
  { code: "HARMONY2", type: ct.SingleCivil, rank: 3 },
  { code: "PLUM1", type: ct.SingleCivil, rank: 4 },
  { code: "PLUM2", type: ct.SingleCivil, rank: 4 },
  { code: "LONG1", type: ct.SingleCivil, rank: 5 },
  { code: "LONG2", type: ct.SingleCivil, rank: 5 },
  { code: "BENCH1", type: ct.SingleCivil, rank: 6 },
  { code: "BENCH2", type: ct.SingleCivil, rank: 6 },
  { code: "TIGER1", type: ct.SingleCivil, rank: 7 },
  { code: "TIGER2", type: ct.SingleCivil, rank: 7 },
  { code: "TEN1", type: ct.SingleCivil, rank: 8 },
  { code: "TEN2", type: ct.SingleCivil, rank: 8 },
  { code: "LEG1", type: ct.SingleCivil, rank: 9 },
  { code: "LEG2", type: ct.SingleCivil, rank: 9 },
  { code: "MALLET1", type: ct.SingleCivil, rank: 10 },
  { code: "MALLET2", type: ct.SingleCivil, rank: 10 },

  //SingleMilitary
  { code: "NINE1", type: ct.SingleMilitary, rank: 0 },
  { code: "NINE2", type: ct.SingleMilitary, rank: 0 },
  { code: "EIGHT1", type: ct.SingleMilitary, rank: 1 },
  { code: "EIGHT2", type: ct.SingleMilitary, rank: 1 },
  { code: "SEVEN1", type: ct.SingleMilitary, rank: 2 },
  { code: "SEVEN2", type: ct.SingleMilitary, rank: 2 },
  { code: "SIX1", type: ct.SingleMilitary, rank: 3 },
  { code: "FIVE1", type: ct.SingleMilitary, rank: 4 },
  { code: "FIVE2", type: ct.SingleMilitary, rank: 4 },
  { code: "THREE1", type: ct.SingleMilitary, rank: 5 },

  //DoubleCivil
  { code: "HEAVEN1_HEAVEN2", type: ct.DoubleCivil, rank: 0 },
  { code: "EARTH1_EARTH2", type: ct.DoubleCivil, rank: 1 },
  { code: "MAN1_MAN2", type: ct.DoubleCivil, rank: 2 },
  { code: "HARMONY1_HARMONY2", type: ct.DoubleCivil, rank: 3 },
  { code: "PLUM1_PLUM2", type: ct.DoubleCivil, rank: 4 },
  { code: "LONG1_LONG2", type: ct.DoubleCivil, rank: 5 },
  { code: "BENCH1_BENCH2", type: ct.DoubleCivil, rank: 6 },
  { code: "TIGER1_TIGER2", type: ct.DoubleCivil, rank: 7 },
  { code: "TEN1_TEN2", type: ct.DoubleCivil, rank: 8 },
  { code: "LEG1_LEG2", type: ct.DoubleCivil, rank: 9 },

  //DoubleMilitary
  { code: "NINE1_NINE2", type: ct.DoubleMilitary, rank: 0 },
  { code: "EIGHT1_EIGHT2", type: ct.DoubleMilitary, rank: 1 },
  { code: "SEVEN1_SEVEN2", type: ct.DoubleMilitary, rank: 2 },
  { code: "FIVE1_FIVE2", type: ct.DoubleMilitary, rank: 3 },

  //PrimeMilitary
  { code: "SIX1_THREE1", type: ct.PrimeMilitary, rank: 0 },

  //PrimeCivil
  { code: "MALLET1_MALLET2", type: ct.PrimeCivil, rank: 0 },

  //CivilMilitary
  { code: "HEAVEN1_NINE1", type: ct.CivilMilitary, rank: 0 },
  { code: "HEAVEN1_NINE2", type: ct.CivilMilitary, rank: 0 },
  { code: "HEAVEN2_NINE1", type: ct.CivilMilitary, rank: 0 },
  { code: "HEAVEN2_NINE2", type: ct.CivilMilitary, rank: 0 },
  { code: "EARTH1_EIGHT1", type: ct.CivilMilitary, rank: 1 },
  { code: "EARTH1_EIGHT2", type: ct.CivilMilitary, rank: 1 },
  { code: "EARTH2_EIGHT1", type: ct.CivilMilitary, rank: 1 },
  { code: "EARTH2_EIGHT2", type: ct.CivilMilitary, rank: 1 },
  { code: "MAN1_SEVEN1", type: ct.CivilMilitary, rank: 2 },
  { code: "MAN1_SEVEN2", type: ct.CivilMilitary, rank: 2 },
  { code: "MAN2_SEVEN1", type: ct.CivilMilitary, rank: 2 },
  { code: "MAN2_SEVEN2", type: ct.CivilMilitary, rank: 2 },
  { code: "HARMONY1_FIVE1", type: ct.CivilMilitary, rank: 3 },
  { code: "HARMONY1_FIVE2", type: ct.CivilMilitary, rank: 3 },
  { code: "HARMONY2_FIVE1", type: ct.CivilMilitary, rank: 3 },
  { code: "HARMONY2_FIVE2", type: ct.CivilMilitary, rank: 3 },

  //TripletCivilPair
  { code: "HEAVEN1_HEAVEN2_NINE1", type: ct.TripletCivilPair, rank: 0 },
  { code: "HEAVEN1_HEAVEN2_NINE2", type: ct.TripletCivilPair, rank: 0 },
  { code: "EARTH1_EARTH2_EIGHT1", type: ct.TripletCivilPair, rank: 1 },
  { code: "EARTH1_EARTH2_EIGHT2", type: ct.TripletCivilPair, rank: 1 },
  { code: "EARTH1_EARTH2_EIGHT1", type: ct.TripletCivilPair, rank: 1 },
  { code: "MAN1_MAN2_SEVEN1", type: ct.TripletCivilPair, rank: 2 },
  { code: "MAN1_MAN2_SEVEN2", type: ct.TripletCivilPair, rank: 2 },
  { code: "HARMONY1_HARMONY2_FIVE1", type: ct.TripletCivilPair, rank: 3 },
  { code: "HARMONY1_HARMONY2_FIVE2", type: ct.TripletCivilPair, rank: 3 },

  //TripletMilitaryPair
  { code: "HEAVEN1_NINE1_NINE2", type: ct.TripletMilitaryPair, rank: 0 },
  { code: "HEAVEN2_NINE1_NINE2", type: ct.TripletMilitaryPair, rank: 0 },
  { code: "EARTH1_EIGHT1_EIGHT2", type: ct.TripletMilitaryPair, rank: 1 },
  { code: "EARTH2_EIGHT1_EIGHT2", type: ct.TripletMilitaryPair, rank: 1 },
  { code: "MAN1_SEVEN1_SEVEN2", type: ct.TripletMilitaryPair, rank: 2 },
  { code: "MAN2_SEVEN1_SEVEN2", type: ct.TripletMilitaryPair, rank: 2 },
  { code: "HARMONY1_FIVE1_FIVE2", type: ct.TripletMilitaryPair, rank: 3 },
  { code: "HARMONY2_FIVE1_FIVE2", type: ct.TripletMilitaryPair, rank: 3 },

  //Quadruple
  { code: "HEAVEN1_HEAVEN2_NINE1_NINE2", type: ct.Quadruple, rank: 0 },
  { code: "EARTH1_EARTH2_EIGHT1_EIGHT2", type: ct.Quadruple, rank: 1 },
  { code: "MAN1_MAN2_SEVEN1_SEVEN2", type: ct.Quadruple, rank: 2 },
  { code: "HARMONY1_HARMONY2_FIVE1_FIVE2", type: ct.Quadruple, rank: 3 },
];

export default combinations;
