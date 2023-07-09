import {
  BracketSolver,
  ChampionshipPointsTable,
  Match,
  ChampionshipConfiguration,
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
  1: 180,
  2: 150,
  3: 120,
  4: 90,
  5: 75,
  6: 60,
  7: 45,
  8: 30,
  9: 15,
  10: 7,
};

const previousPointsPerSeed: ChampionshipPointsTable = {
  1: 180,
  2: 30,
  3: 10,
  4: 30,
  5: 130,
  6: 90,
  7: 220,
  8: 120,
  9: 90,
  10: 130,
};

const lec2BracketSolver: BracketSolver = (scenario) => {
  const match1: Match = { seed1: 5, seed2: 4, result: getResult(scenario, 1) };
  const match2: Match = { seed1: 8, seed2: 1, result: getResult(scenario, 2) };
  const match3: Match = {
    seed1: getWinner(match1),
    seed2: getWinner(match2),
    result: getResult(scenario, 3),
  };
  const match4: Match = {
    seed1: getLoser(match1),
    seed2: getLoser(match2),
    result: getResult(scenario, 4),
  };
  const match5: Match = {
    seed1: getLoser(match3),
    seed2: getWinner(match4),
    result: getResult(scenario, 5),
  };
  const match6: Match = { seed1: 7, seed2: 3, result: getResult(scenario, 6) };
  const match7: Match = { seed1: 6, seed2: 2, result: getResult(scenario, 7) };
  const match8: Match = {
    seed1: getWinner(match6),
    seed2: getWinner(match7),
    result: getResult(scenario, 8),
  };
  const match9: Match = {
    seed1: getLoser(match6),
    seed2: getLoser(match7),
    result: getResult(scenario, 9),
  };
  const match10: Match = {
    seed1: getLoser(match8),
    seed2: getWinner(match9),
    result: getResult(scenario, 10),
  };
  const match11: Match = {
    seed1: getWinner(match3),
    seed2: getWinner(match8),
    result: getResult(scenario, 11),
  };
  const match12: Match = {
    seed1: getWinner(match5),
    seed2: getWinner(match10),
    result: getResult(scenario, 12),
  };
  const match13: Match = {
    seed1: getLoser(match11),
    seed2: getWinner(match12),
    result: getResult(scenario, 13),
  };
  const match14: Match = {
    seed1: getWinner(match11),
    seed2: getWinner(match13),
    result: getResult(scenario, 14),
  };
  return {
    scenario,
    standings: {
      1: [getWinner(match14)],
      2: [getLoser(match14)],
      3: [getLoser(match13)],
      4: [getLoser(match12)],
      5: [getHigherSeed(getLoser(match5), getLoser(match10))],
      6: [getLowerSeed(getLoser(match5), getLoser(match10))],
      7: [getHigherSeed(getLoser(match4), getLoser(match9))],
      8: [getLowerSeed(getLoser(match4), getLoser(match9))],
      9: [9],
      10: [10],
    },
  };
};

export const lec2Configuration: ChampionshipConfiguration = {
  totalMatches: 14,
  totalTeams: 10,
  solver: (scenario) =>
    championshipPointsSolver(lec2BracketSolver(scenario), {
      championshipPointsTable: summerPointsTable,
      previousPointsPerSeed,
    }),
};
