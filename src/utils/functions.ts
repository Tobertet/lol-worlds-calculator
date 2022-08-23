import { MatchResult, ProcessedTeam, Team } from "../types";
import { endingScenarios, PlayoffsScenario } from "./masterTable";

export const getLowerSeed = (team1?: ProcessedTeam, team2?: ProcessedTeam) => {
  console.log(team1);
  console.log(team2);
  return team1 && team2 ? (team1.seed > team2.seed ? team1 : team2) : undefined;
};

export const getHigherSeed = (team1?: ProcessedTeam, team2?: ProcessedTeam) =>
  team1 && team2 ? (team1.seed > team2.seed ? team2 : team1) : undefined;

const resultsToScenario = (results: {
  [index: number]: MatchResult;
}): PlayoffsScenario => {
  let scenario = {};
  for (const matchNumber in results) {
    scenario = { ...scenario, [matchNumber]: results[matchNumber].result };
  }
  return scenario;
};

export const getProbabilityForPosition = (
  position: number,
  results: { [index: number]: MatchResult }
): { seed: number; probability: number }[] => {
  const seedScenarios = endingScenarios[position];

  const resultsScenario = resultsToScenario(results);

  let processedSeeds: { seed: number; probability: number }[] = [];
  for (const seed in seedScenarios) {
    let processedScenarios: { scenarioLength: number; matchLength: number }[] =
      [];
    for (const scenario of seedScenarios[seed]) {
      const matchingElements = Object.keys(resultsScenario).filter((val) =>
        Object.keys(scenario).includes(val)
      );

      let scenarioMatches: boolean = true;
      for (const element of matchingElements) {
        if (
          resultsScenario[parseInt(element)] !== scenario[parseInt(element)]
        ) {
          scenarioMatches = false;
        }
      }
      if (scenarioMatches) {
        processedScenarios = [
          ...processedScenarios,
          {
            matchLength: matchingElements.length,
            scenarioLength: Object.keys(scenario).length,
          },
        ];
      }
    }

    let amount = 0;
    for (const processedScenario of processedScenarios) {
      const value =
        Math.pow(2, 9 - processedScenario.scenarioLength) /
        Math.pow(2, 9 - processedScenario.matchLength);

      amount += value;
    }
    processedSeeds = [
      ...processedSeeds,
      { seed: parseInt(seed), probability: amount },
    ];
  }
  return processedSeeds;
};

export const getWorldsProbabilityForTeam = (
  team: Team,
  results: { [index: number]: MatchResult }
): number => {
  return 100;
};
