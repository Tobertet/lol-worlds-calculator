import { MatchResult, ProcessedTeam } from "../types";

export const getLowerSeed = (team1?: ProcessedTeam, team2?: ProcessedTeam) =>
  team1 && team2 ? (team1.seed > team2.seed ? team1 : team2) : undefined;

export const getHigherSeed = (team1?: ProcessedTeam, team2?: ProcessedTeam) =>
  team1 && team2 ? (team1.seed > team2.seed ? team2 : team1) : undefined;

export const getLoser = (
  team1: ProcessedTeam,
  team2: ProcessedTeam,
  result: MatchResult
) => (result === 1 ? team1 : result === 0 ? team2 : undefined);

export const getWinner = (
  team1: ProcessedTeam,
  team2: ProcessedTeam,
  result: MatchResult
) => (result === 1 ? team2 : result === 0 ? team1 : undefined);
