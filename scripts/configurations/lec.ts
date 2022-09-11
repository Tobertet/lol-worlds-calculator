import {
  ChampionshipConfiguration,
  BracketSolver,
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

const lecBracketSolver: BracketSolver = (scenario) => {
  const match1: Match = { seed1: 4, seed2: 1, result: getResult(scenario, 1) };
  const match2: Match = { seed1: 2, seed2: 3, result: getResult(scenario, 2) };
  const match3: Match = { seed1: 5, seed2: 6, result: getResult(scenario, 3) };
  const match4: Match = {
    seed1: getLowerSeed(getLoser(match1), getLoser(match2)),
    seed2: getWinner(match3),
    result: getResult(scenario, 4),
  };
  const match5: Match = {
    seed1: getWinner(match1),
    seed2: getWinner(match2),
    result: getResult(scenario, 5),
  };
  const match6: Match = {
    seed1: getHigherSeed(getLoser(match1), getLoser(match2)),
    seed2: getWinner(match4),
    result: getResult(scenario, 6),
  };
  const match7: Match = {
    seed1: getLoser(match5),
    seed2: getWinner(match6),
    result: getResult(scenario, 7),
  };
  const match8: Match = {
    seed1: getWinner(match5),
    seed2: getWinner(match7),
    result: getResult(scenario, 8),
  };
  return {
    scenario,
    standings: {
      1: [getWinner(match8)],
      2: [getLoser(match8)],
      3: [getLoser(match7)],
      4: [getLoser(match6)],
      5: [getLoser(match4)],
      6: [getLoser(match3)],
    },
  };
};

const convertStandings = (standings: Standings): Standings => {
  let newStandings: Standings = [];
  for (const key of Object.keys(standings)) {
    newStandings[parseInt(key) - 1] = standings[key];
  }
  return newStandings;
};

const lecPointsSolver: PointsSolver = (playoffsResult) => ({
  ...playoffsResult,
  standings: convertStandings(playoffsResult.standings),
});

export const lecConfiguration: ChampionshipConfiguration = {
  totalMatches: 8,
  totalTeams: 6,
  bracketSolver: lecBracketSolver,
  pointsSolver: lecPointsSolver,
};
