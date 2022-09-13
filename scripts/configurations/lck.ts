import {
  BracketSolver,
  ChampionshipPointsTable,
  Match,
  NewChampionshipConfiguration,
} from "../types";
import {
  championshipPointsSolver,
  getHigherSeed,
  getLoser,
  getLowerSeed,
  getResult,
  getWinner,
} from "./utils";

const summerPointsTable: ChampionshipPointsTable = {
  1: 10000,
  2: 100,
  3: 80,
  4: 50,
  5: 30,
  6: 10,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
};

const previousPointsPerSeed: ChampionshipPointsTable = {
  1: 70,
  2: 90,
  3: 0,
  4: 50,
  5: 0,
  6: 20,
  7: 30,
  8: 0,
  9: 10,
  10: 0,
};

const lckBracketSolver: BracketSolver = (scenario) => {
  const match1: Match = { seed1: 3, seed2: 6, result: getResult(scenario, 1) };
  const match2: Match = { seed1: 4, seed2: 5, result: getResult(scenario, 2) };
  const match3: Match = {
    seed1: 1,
    seed2: getWinner(match1),
    result: getResult(scenario, 3),
  };
  const match4: Match = {
    seed1: 2,
    seed2: getWinner(match2),
    result: getResult(scenario, 4),
  };
  const match5: Match = {
    seed1: getWinner(match3),
    seed2: getWinner(match4),
    result: getResult(scenario, 5),
  };
  return {
    scenario,
    standings: {
      1: [getWinner(match5)],
      2: [getLoser(match5)],
      3: [getHigherSeed(getLoser(match3), getLoser(match4))],
      4: [getLowerSeed(getLoser(match3), getLoser(match4))],
      5: [getHigherSeed(getLoser(match1), getLoser(match2))],
      6: [getLowerSeed(getLoser(match1), getLoser(match2))],
      7: [7],
      8: [8],
      9: [9],
      10: [10],
    },
  };
};

export const lckConfiguration: NewChampionshipConfiguration = {
  totalMatches: 5,
  totalTeams: 10,
  solver: (scenario) =>
    championshipPointsSolver(lckBracketSolver(scenario), {
      championshipPointsTable: summerPointsTable,
      previousPointsPerSeed,
    }),
};
