import { generateScenarios } from "./generateScenarios";

type Match = {
  seed1: number;
  seed2: number;
  result: 1 | 0;
};

const getLoser = (match: Match) =>
  match.result === 1 ? match.seed1 : match.seed2;
const getWinner = (match: Match) =>
  match.result === 1 ? match.seed2 : match.seed1;

export const calculatePlayoffsResults = () => {
  const scenarios = generateScenarios(12);

  return scenarios.map((results) => {
    const match1: Match = { seed1: 9, seed2: 8, result: results[0] };
    const match2: Match = { seed1: 7, seed2: 10, result: results[1] };
    const match3: Match = {
      seed1: 5,
      seed2: getWinner(match1),
      result: results[2],
    };
    const match4: Match = {
      seed1: 6,
      seed2: getWinner(match2),
      result: results[3],
    };
    const match5: Match = {
      seed1: 4,
      seed2: getWinner(match3),
      result: results[4],
    };
    const match6: Match = {
      seed1: 3,
      seed2: getWinner(match4),
      result: results[5],
    };
    const match7: Match = {
      seed1: 1,
      seed2: getWinner(match5),
      result: results[6],
    };
    const match8: Match = {
      seed1: 2,
      seed2: getWinner(match6),
      result: results[7],
    };
    const match9: Match = {
      seed1: getWinner(match7),
      seed2: getWinner(match8),
      result: results[8],
    };
    const match10: Match = {
      seed1: getLoser(match7),
      seed2: getLoser(match8),
      result: results[9],
    };
    const match11: Match = {
      seed1: getLoser(match9),
      seed2: getWinner(match10),
      result: results[10],
    };
    const match12: Match = {
      seed1: getWinner(match9),
      seed2: getWinner(match11),
      result: results[11],
    };
    return {
      scenario: results,
      results: {
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
  });
};
