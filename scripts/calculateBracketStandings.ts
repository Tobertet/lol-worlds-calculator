import { calculateAllCompleteScenarios } from "./calculateAllCompleteScenarios";
import { ChampionshipConfiguration } from "./types";

export const calculateBracketStandings = ({
  totalMatches,
  bracketSolver,
}: ChampionshipConfiguration) =>
  calculateAllCompleteScenarios(totalMatches).map(bracketSolver);
