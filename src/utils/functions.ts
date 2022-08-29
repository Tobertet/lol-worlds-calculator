import { MatchResult, Team } from "../types";
import { endingScenarios, PlayoffsScenario } from "./masterTable";

export const getLowerSeed = (team1?: Team, team2?: Team) => {
  return team1 && team2 ? (team1.seed > team2.seed ? team1 : team2) : undefined;
};

export const getTeam = (teams: Team[], seed?: number): Team | undefined => {
  if (seed === undefined) {
    return;
  }
  return teams.find((item) => item.seed === seed);
};

export const getHigherSeed = (team1?: Team, team2?: Team) =>
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
  return processedSeeds
    .filter((item) => item.probability > 0)
    .sort((a, b) =>
      a.probability > b.probability ? -1 : b.probability > a.probability ? 1 : 0
    );
};

export const getWorldsProbabilityForTeam = (
  team: Team,
  results: { [index: number]: MatchResult },
  worldsSpots: number = 4
): number => {
  let accumulatedProbability = 0;

  for (let i = 1; i <= worldsSpots; i++) {
    accumulatedProbability +=
      getProbabilityForPosition(i, results).find((x) => x.seed === team.seed)
        ?.probability || 0;
  }

  return Math.round(accumulatedProbability * 10000) / 100;
};
