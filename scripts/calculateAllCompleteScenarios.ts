import { CompleteScenario, MatchResult } from "./types";

export const calculateAllCompleteScenarios = (
  dimensions: number
): CompleteScenario[] => {
  let scenarios: CompleteScenario[] = [];
  for (let number = 0; number < Math.pow(2, dimensions); number++) {
    let scenario: MatchResult[] = [];
    for (let i = 0; i < dimensions; i++) {
      scenario[i] = Math.floor(
        (number / Math.pow(2, dimensions - (i + 1))) % 2
      ) as MatchResult;
    }
    scenarios = [...scenarios, scenario];
  }
  return scenarios;
};
