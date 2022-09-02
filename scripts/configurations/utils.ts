import { CompleteScenario, Match } from "../types";

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
