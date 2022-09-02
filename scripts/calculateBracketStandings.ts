import { calculateAllCompleteScenarios } from "./calculateAllCompleteScenarios";
import { BracketConfiguration } from "./types";

export const calculateBracketStandings = ({
  totalMatches,
  bracketSolver,
}: BracketConfiguration) =>
  calculateAllCompleteScenarios(totalMatches).map(bracketSolver);
