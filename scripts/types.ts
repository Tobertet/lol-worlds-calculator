export type MatchResult = 0 | 1;

export type Scenario = MatchResult[];

export type Match = {
  seed1: number;
  seed2: number;
  result: 1 | 0;
};

export type Standings = {
  [position: number]: number;
};

export type ScenarioStandings = {
  scenario: Scenario;
  standings: Standings;
};

export type ReducedScenario = {
  [match: number]: MatchResult;
};

export type MatchStatus = 1 | 0 | undefined;

export type PlayoffsScenario = {
  [match: number]: MatchStatus;
};

export type SeedScenarios = {
  [seed: number]: PlayoffsScenario[];
};

export type EndingScenarios = {
  [position: number]: SeedScenarios;
};
