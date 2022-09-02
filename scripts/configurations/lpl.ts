import {
  ChampionshipConfiguration,
  BracketSolver,
  ChampionshipPointsResult,
  ChampionshipPointsTable,
  Match,
  PointsSolver,
  Standings,
} from "../types";
import { getLoser, getResult, getWinner } from "./utils";

const lplSpringPointsTable: ChampionshipPointsTable = {
  1: 90,
  2: 70,
  3: 50,
  4: 30,
  5: 20,
  6: 20,
  7: 10,
  8: 10,
  9: 0,
  10: 0,
};

const lplSummerPointsTable: ChampionshipPointsTable = {
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

const lplSpringStandings: Standings = {
  1: 2,
  2: 4,
  3: 3,
  4: 1,
  5: 7,
  6: 5,
  7: 6,
  8: 9,
  9: 10,
  10: 8,
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
      1: getWinner(match12),
      2: getLoser(match12),
      3: getLoser(match11),
      4: getLoser(match10),
      5: getLoser(match5),
      6: getLoser(match6),
      7: getLoser(match3),
      8: getLoser(match4),
      9: getLoser(match1),
      10: getLoser(match2),
    },
  };
};

const lplPointsSolver: PointsSolver = (playoffsResult) => {
  let results: ChampionshipPointsResult[] = [];
  for (const standingsPosition in playoffsResult.standings) {
    const seed = playoffsResult.standings[standingsPosition];
    results = [
      ...results,
      {
        seed,
        summerPoints: lplSummerPointsTable[standingsPosition],
        championshipPoints:
          lplSummerPointsTable[standingsPosition] +
          lplSpringPointsTable[lplSpringStandings[seed]],
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
      .map((result) => result.seed),
  };
};

export const lplConfiguration: ChampionshipConfiguration = {
  totalMatches: 12,
  totalTeams: 10,
  bracketSolver: lplBracketSolver,
  pointsSolver: lplPointsSolver,
};
