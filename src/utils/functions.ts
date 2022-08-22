import { MatchResult, MatchStatus, ProcessedTeam, Team } from "../types";

export const getLowerSeed = (team1?: ProcessedTeam, team2?: ProcessedTeam) => {
  console.log(team1);
  console.log(team2);
  return team1 && team2 ? (team1.seed > team2.seed ? team1 : team2) : undefined;
};

export const getHigherSeed = (team1?: ProcessedTeam, team2?: ProcessedTeam) =>
  team1 && team2 ? (team1.seed > team2.seed ? team2 : team1) : undefined;

export const getProbabilityForPosition = (
  position: number,
  results: { [index: number]: MatchResult }
): { team: Team; probability: number }[] => {
  return [];
};

export const getWorldsProbabilityForTeam = (
  team: Team,
  results: { [index: number]: MatchResult }
): number => {
  return 100;
};
