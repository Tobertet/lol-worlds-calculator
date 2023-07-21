import {
  BracketSolver,
  ChampionshipPointsTable,
  Match,
  ChampionshipConfiguration,
} from "../types";
import {
  championshipPointsSolver,
  getLoser,
  getResult,
  getWinner,
} from "./utils";

const summerPointsTable: ChampionshipPointsTable = {
  1: 10000,
  2: 110,
  3: 80,
  4: 60,
  5: 40,
  6: 40,
  7: 10,
  8: 10,
  9: 0,
  10: 0,
};

const previousPointsPerSeed: ChampionshipPointsTable = {
  1: 70,
  2: 30,
  3: 50,
  4: 90,
  5: 10,
  6: 20,
  7: 20,
  8: 0,
  9: 0,
  10: 10,
};

const lplBracketSolver: BracketSolver = (scenario) => {
  const match1: Match = { seed1: 9, seed2: 8, result: getResult(scenario, 1) };
  const match2: Match = { seed1: 7, seed2: 10, result: getResult(scenario, 2) };
  const match3: Match = {
    seed1: 5,
    seed2: getWinner(match1),
    result: getResult(scenario, 3),
  };
  const match4: Match = {
    seed1: 6,
    seed2: getWinner(match2),
    result: getResult(scenario, 4),
  };
  const match5: Match = {
    seed1: 4,
    seed2: getWinner(match3),
    result: getResult(scenario, 5),
  };
  const match6: Match = {
    seed1: 3,
    seed2: getWinner(match4),
    result: getResult(scenario, 6),
  };
  const match7: Match = {
    seed1: 1,
    seed2: getWinner(match5),
    result: getResult(scenario, 7),
  };
  const match8: Match = {
    seed1: 2,
    seed2: getWinner(match6),
    result: getResult(scenario, 8),
  };
  const match9: Match = {
    seed1: getWinner(match7),
    seed2: getWinner(match8),
    result: getResult(scenario, 9),
  };
  const match10: Match = {
    seed1: getLoser(match7),
    seed2: getLoser(match8),
    result: getResult(scenario, 10),
  };
  const match11: Match = {
    seed1: getLoser(match9),
    seed2: getWinner(match10),
    result: getResult(scenario, 11),
  };
  const match12: Match = {
    seed1: getWinner(match9),
    seed2: getWinner(match11),
    result: getResult(scenario, 12),
  };
  return {
    scenario,
    standings: {
      1: [getWinner(match12)],
      2: [getLoser(match12)],
      3: [getLoser(match11)],
      4: [getLoser(match10)],
      5: [getLoser(match5)],
      6: [getLoser(match6)],
      7: [getLoser(match3)],
      8: [getLoser(match4)],
      9: [getLoser(match1)],
      10: [getLoser(match2)],
    },
  };
};

export const lplConfiguration: ChampionshipConfiguration = {
  totalMatches: 12,
  totalTeams: 10,
  solver: (scenario) =>
    championshipPointsSolver(lplBracketSolver(scenario), {
      championshipPointsTable: summerPointsTable,
      previousPointsPerSeed,
    }),
};
