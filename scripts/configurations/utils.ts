import { CompleteScenario, LeagueSolver, Match, Standings } from "../types";

export const getLoser = (match: Match) =>
  match.result === 1 ? match.seed1 : match.seed2;

export const getWinner = (match: Match) =>
  match.result === 1 ? match.seed2 : match.seed1;

export const getResult = (scenario: CompleteScenario, match: number) =>
  scenario[match - 1];

export const getLowerSeed = (seed1: number, seed2: number) =>
  seed1 > seed2 ? seed1 : seed2;

export const getHigherSeed = (seed1: number, seed2: number) =>
  seed1 > seed2 ? seed2 : seed1;

export const leagueSolver: LeagueSolver = (scenario, configuration) => {
  const matches: Match[] = configuration.showdowns.map((showdown, index) => ({
    ...showdown,
    result: getResult(scenario, index + 1),
  }));

  let victoriesPerSeed = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  };

  for (const match of matches) {
    const winnerSeed = getWinner(match);
    victoriesPerSeed = {
      ...victoriesPerSeed,
      [winnerSeed]: victoriesPerSeed[winnerSeed] + 1,
    };
  }

  const seedsByVictories = {};

  for (let seed = 1; seed <= 4; seed++) {
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
  };

  for (const victories of Object.keys(seedsByVictories).reverse()) {
    for (let position = 1; position <= 4; position++) {
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
