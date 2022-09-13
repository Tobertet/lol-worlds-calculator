import { NewChampionshipConfiguration, LeagueConfiguration } from "../../types";
import { leagueSolver } from "../utils";

const configuration: LeagueConfiguration = {
  showdowns: [
    { seed1: 1, seed2: 2 },
    { seed1: 1, seed2: 3 },
    { seed1: 1, seed2: 4 },
    { seed1: 1, seed2: 5 },
    { seed1: 1, seed2: 6 },
    { seed1: 2, seed2: 3 },
    { seed1: 2, seed2: 4 },
    { seed1: 2, seed2: 5 },
    { seed1: 2, seed2: 6 },
    { seed1: 3, seed2: 4 },
    { seed1: 3, seed2: 5 },
    { seed1: 3, seed2: 6 },
    { seed1: 4, seed2: 5 },
    { seed1: 4, seed2: 6 },
    { seed1: 5, seed2: 6 },
  ],
};

export const worldsPlayInsLeagueConfiguration: NewChampionshipConfiguration = {
  totalMatches: 15,
  totalTeams: 6,
  solver: (scenario) => leagueSolver(scenario, configuration),
};
