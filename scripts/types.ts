export type MatchResult = 0 | 1;

export type CompleteScenario = MatchResult[];

export type Match = {
  seed1: number;
  seed2: number;
  result: MatchResult;
};

export type Standings = {
  [position: number]: number[];
};

type SolvedScenario = {
  scenario: CompleteScenario;
  standings: Standings;
};

export type BracketSolver = (scenario: CompleteScenario) => SolvedScenario;
export type PointsSolver = (scenario: SolvedScenario) => SolvedScenario;

export type ChampionshipConfiguration = {
  totalMatches: number;
  totalTeams: number;
  bracketSolver: BracketSolver;
  pointsSolver: PointsSolver;
};

export type ChampionshipPointsTable = {
  [position: number]: number;
};

export type ChampionshipPointsResult = {
  seed: number;
  summerPoints: number;
  championshipPoints: number;
};

export type ReducedScenario = {
  [match: number]: MatchResult;
};

type SeedScenarios = {
  [seed: number]: ReducedScenario[];
};

export type PositionScenarios = {
  [position: number]: SeedScenarios;
};
