import {
  ChampionshipConfiguration,
  BracketSolver,
  Match,
  PointsSolver,
  Standings,
} from "../../types";
import { getResult, getWinner } from "../utils";

const playInsLeagueSolver: BracketSolver = (scenario) => {
  const match1: Match = { seed1: 1, seed2: 2, result: getResult(scenario, 1) };
  const match2: Match = { seed1: 1, seed2: 3, result: getResult(scenario, 2) };
  const match3: Match = { seed1: 1, seed2: 4, result: getResult(scenario, 3) };
  const match4: Match = { seed1: 1, seed2: 5, result: getResult(scenario, 4) };
  const match5: Match = { seed1: 1, seed2: 6, result: getResult(scenario, 5) };
  const match6: Match = { seed1: 2, seed2: 3, result: getResult(scenario, 6) };
  const match7: Match = { seed1: 2, seed2: 4, result: getResult(scenario, 7) };
  const match8: Match = { seed1: 2, seed2: 5, result: getResult(scenario, 8) };
  const match9: Match = { seed1: 2, seed2: 6, result: getResult(scenario, 9) };
  const match10: Match = {
    seed1: 3,
    seed2: 4,
    result: getResult(scenario, 10),
  };
  const match11: Match = {
    seed1: 3,
    seed2: 5,
    result: getResult(scenario, 11),
  };
  const match12: Match = {
    seed1: 3,
    seed2: 6,
    result: getResult(scenario, 12),
  };
  const match13: Match = {
    seed1: 4,
    seed2: 5,
    result: getResult(scenario, 13),
  };
  const match14: Match = {
    seed1: 4,
    seed2: 6,
    result: getResult(scenario, 14),
  };
  const match15: Match = {
    seed1: 5,
    seed2: 6,
    result: getResult(scenario, 15),
  };

  const matches = [
    match1,
    match2,
    match3,
    match4,
    match5,
    match6,
    match7,
    match8,
    match9,
    match10,
    match11,
    match12,
    match13,
    match14,
    match15,
  ];

  let victoriesPerSeed = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  for (const match of matches) {
    const winnerSeed = getWinner(match);
    victoriesPerSeed = {
      ...victoriesPerSeed,
      [winnerSeed]: victoriesPerSeed[winnerSeed] + 1,
    };
  }

  const seedsByVictories = {};

  for (let seed = 1; seed <= 6; seed++) {
    seedsByVictories[victoriesPerSeed[seed]] =
      seedsByVictories[victoriesPerSeed[seed]] === undefined
        ? [seed]
        : [...seedsByVictories[victoriesPerSeed[seed]], seed];
  }

  const standings: Standings = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  for (const victories of Object.keys(seedsByVictories).reverse()) {
    for (let position = 1; position <= 6; position++) {
      if (standings[position].length === 0) {
        for (let i = 0; i < seedsByVictories[victories].length; i++) {
          standings[position + i] = seedsByVictories[victories];
        }
        break;
      }
    }
  }

  return {
    scenario,
    standings,
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

export const playInsConfiguration: ChampionshipConfiguration = {
  totalMatches: 15,
  totalTeams: 6,
  bracketSolver: playInsLeagueSolver,
  pointsSolver: lecPointsSolver,
};
