import { LeagueConfiguration, NewChampionshipConfiguration } from "../../types";
import { leagueSolver } from "../utils";

const configuration: LeagueConfiguration = {
  showdowns: [
    { seed1: 1, seed2: 2 },
    { seed1: 1, seed2: 2 },
    { seed1: 1, seed2: 3 },
    { seed1: 1, seed2: 3 },
    { seed1: 1, seed2: 4 },
    { seed1: 1, seed2: 4 },
    { seed1: 2, seed2: 3 },
    { seed1: 2, seed2: 3 },
    { seed1: 2, seed2: 4 },
    { seed1: 2, seed2: 4 },
    { seed1: 3, seed2: 4 },
    { seed1: 3, seed2: 4 },
  ],
};

export const worldsGroupsLeagueConfiguration: NewChampionshipConfiguration = {
  totalMatches: 12,
  totalTeams: 4,
  solver: (scenario) => leagueSolver(scenario, configuration),
};
