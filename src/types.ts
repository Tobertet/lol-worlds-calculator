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

export type MatchResult = 1 | 0 | undefined;
