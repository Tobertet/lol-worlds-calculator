type Result = 0 | 1;

type Scenario = Result[];

export const generateScenarios = (totalMatches: number): Scenario[] => {
  let scenarios: Scenario[] = [];
  for (let number = 0; number < Math.pow(2, totalMatches); number++) {
    let scenario: Result[] = [];
    for (let i = 0; i < totalMatches; i++) {
      scenario[i] = Math.floor(
        (number / Math.pow(2, totalMatches - (i + 1))) % 2
      ) as Result;
    }
    scenarios = [...scenarios, scenario];
  }
  return scenarios;
};
