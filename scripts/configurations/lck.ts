import {
  ChampionshipConfiguration,
  BracketSolver,
  ChampionshipPointsResult,
  ChampionshipPointsTable,
  Match,
  PointsSolver,
  Standings,
} from "../types";
import {
  getHigherSeed,
  getLoser,
  getLowerSeed,
  getResult,
  getWinner,
} from "./utils";

const lckSpringPointsTable: ChampionshipPointsTable = {
  1: 90,
  2: 70,
  3: 50,
  4: 30,
  5: 20,
  6: 10,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
};

const lckSummerPointsTable: ChampionshipPointsTable = {
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

const lckSpringStandings: Standings = {
  1: [2],
  2: [1],
  3: [7],
  4: [3],
  5: [8],
  6: [5],
  7: [4],
  8: [9],
  9: [6],
  10: [10],
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

const lckPointsSolver: PointsSolver = (playoffsResult) => {
  let results: ChampionshipPointsResult[] = [];
  for (const standingsPosition in playoffsResult.standings) {
    const seed = playoffsResult.standings[standingsPosition][0];
    results = [
      ...results,
      {
        seed,
        summerPoints: lckSummerPointsTable[standingsPosition],
        championshipPoints:
          lckSummerPointsTable[standingsPosition] +
          lckSpringPointsTable[lckSpringStandings[seed][0]],
      },
    ];
  }
  if (
    results[5].championshipPoints === results[6].championshipPoints &&
    results[5].summerPoints === results[6].summerPoints
  ) {
    throw Error(
      `Two teams have the same championshipPoints and summerPoints in positions 6 and 7 for scenario ${playoffsResult.scenario}`
    );
  }
  return {
    scenario: playoffsResult.scenario,
    standings: results
      .sort((a, b) => {
        return a.championshipPoints > b.championshipPoints
          ? -1
          : b.championshipPoints > a.championshipPoints
          ? 1
          : a.summerPoints > b.summerPoints
          ? -1
          : b.summerPoints > a.summerPoints
          ? 1
          : 0;
      })
      .map((result) => [result.seed]),
  };
};

export const lckConfiguration: ChampionshipConfiguration = {
  totalMatches: 5,
  totalTeams: 10,
  bracketSolver: lckBracketSolver,
  pointsSolver: lckPointsSolver,
};
