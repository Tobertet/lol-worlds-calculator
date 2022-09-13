import { BracketSolver, Match, ChampionshipConfiguration } from "../types";
import { getLoser, getResult, getWinner } from "./utils";

const lcsBracketSolver: BracketSolver = (scenario) => {
  const match1: Match = { seed1: 5, seed2: 4, result: getResult(scenario, 1) };
  const match2: Match = { seed1: 3, seed2: 6, result: getResult(scenario, 2) };
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
    seed1: getLoser(match2),
    seed2: 7,
    result: getResult(scenario, 5),
  };
  const match6: Match = {
    seed1: getLoser(match1),
    seed2: 8,
    result: getResult(scenario, 6),
  };
  const match7: Match = {
    seed1: getLoser(match3),
    seed2: getWinner(match5),
    result: getResult(scenario, 7),
  };
  const match8: Match = {
    seed1: getLoser(match4),
    seed2: getWinner(match6),
    result: getResult(scenario, 8),
  };
  const match9: Match = {
    seed1: getWinner(match3),
    seed2: getWinner(match4),
    result: getResult(scenario, 9),
  };
  const match10: Match = {
    seed1: getWinner(match7),
    seed2: getWinner(match8),
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
    },
  };
};

export const lcsConfiguration: ChampionshipConfiguration = {
  totalMatches: 12,
  totalTeams: 8,
  solver: lcsBracketSolver,
};
