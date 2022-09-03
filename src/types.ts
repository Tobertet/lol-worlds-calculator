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

export type Match = {
  team1: Team;
  team2: Team;
  winner: Team;
};

export type MatchStatus = 1 | 0 | undefined;

export type MatchResult = {
  result: MatchStatus;
  loserSeed: number | undefined;
  winnerSeed: number | undefined;
};

export type PlayoffsScenario = {
  [match: number]: MatchStatus;
};

export type SeedScenarios = {
  [seed: number]: PlayoffsScenario[];
};

export type EndingScenarios = {
  [position: number]: SeedScenarios;
};

export type ChampionshipID = "lec" | "lcs" | "lpl" | "lck";
