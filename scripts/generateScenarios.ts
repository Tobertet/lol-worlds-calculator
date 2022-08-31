import { Scenario, MatchResult } from "./types";

export const generateScenarios = (totalMatches: number): Scenario[] => {
  let scenarios: Scenario[] = [];
  for (let number = 0; number < Math.pow(2, totalMatches); number++) {
    let scenario: MatchResult[] = [];
    for (let i = 0; i < totalMatches; i++) {
      scenario[i] = Math.floor(
        (number / Math.pow(2, totalMatches - (i + 1))) % 2
      ) as MatchResult;
    }
    scenarios = [...scenarios, scenario];
  }
  return scenarios;
};
