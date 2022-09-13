import { calculateAllCompleteScenarios } from "./calculateAllCompleteScenarios";
import { NewChampionshipConfiguration } from "./types";

export const calculateAllSolvedScenarios = ({
  totalMatches,
  solver,
}: NewChampionshipConfiguration) =>
  calculateAllCompleteScenarios(totalMatches).map(solver);
