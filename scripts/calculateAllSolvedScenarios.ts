import { calculateAllCompleteScenarios } from "./calculateAllCompleteScenarios";
import { ChampionshipConfiguration } from "./types";

export const calculateAllSolvedScenarios = ({
  totalMatches,
  solver,
}: ChampionshipConfiguration) =>
  calculateAllCompleteScenarios(totalMatches).map(solver);
