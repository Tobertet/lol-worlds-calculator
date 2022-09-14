export type Team = {
  name: string;
  icon: string;
  seed: number;
};

export type ProcessedTeam = {
  name: string;
  icon: string;
  seed: number;
  percentage: number;
};

export type MatchResult = 1 | 0 | undefined;

type ScenarioMetadata = {
  share: number;
};

export type ReducedScenario = {
  [match: number]: MatchResult;
  meta?: ScenarioMetadata;
};

export type SeedScenarios = {
  [seed: number]: ReducedScenario[];
};

export type PositionScenarios = {
  [position: number]: SeedScenarios;
};

export type ChampionshipID = "lec" | "lcs" | "lpl" | "lck";

export type Match = {
  seed1?: number;
  seed2?: number;
  result: MatchResult;
};

export type CompleteScenario = MatchResult[];
