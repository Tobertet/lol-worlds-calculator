import { EndingScenarios, MatchResult, PlayoffsScenario, Team } from "../types";

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

export const toPercentage = (value: number) =>
  `${Math.round(value * 10000) / 100}%`;

export const getProbabilityForPosition = (
  position: number,
  results: { [index: number]: MatchResult },
  scenarios: EndingScenarios
): { seed: number; probability: number }[] => {
  const seedScenarios = scenarios[position];

  const resultsScenario = resultsToScenario(results);

  let processedSeeds: { seed: number; probability: number }[] = [];
  for (const seed in seedScenarios) {
    let processedScenarios: { scenarioLength: number; matchLength: number }[] =
      [];
    for (const scenario of seedScenarios[seed]) {
      const matchingElements = Object.keys(resultsScenario).filter((val) =>
        Object.keys(scenario).includes(val)
      );
      if (intersect([resultsScenario, scenario])) {
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
      amount += Math.pow(
        2,
        processedScenario.matchLength - processedScenario.scenarioLength
      );
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

export const getProbabilityForPositions = (
  positions: number[],
  results: { [index: number]: MatchResult },
  scenarios: EndingScenarios
): { seed: number; probability: number }[] =>
  positions
    .map((position) => getProbabilityForPosition(position, results, scenarios))
    .reduce((prev, curr) => {
      let acc = [...prev];
      for (const item of curr) {
        const index = prev.findIndex((x) => x.seed === item.seed);
        if (index >= 0) {
          acc[index] = {
            ...prev[index],
            probability: prev[index].probability + item.probability,
          };
        } else {
          acc = [...acc, { ...item }];
        }
      }
      return acc;
    }, [])
    .sort((a, b) =>
      a.probability > b.probability ? -1 : b.probability > a.probability ? 1 : 0
    );

export const getWorldsProbabilityForTeam = (
  team: Team,
  results: { [index: number]: MatchResult },
  scenarios: EndingScenarios,
  weights: { [position: number]: number }
): number => {
  let accumulatedProbability = 0;

  for (const position of Object.keys(weights)) {
    accumulatedProbability +=
      (getProbabilityForPosition(parseInt(position), results, scenarios).find(
        (x) => x.seed === team.seed
      )?.probability || 0) * weights[parseInt(position)];
  }

  return accumulatedProbability;
};

const intersect = (scenarios: PlayoffsScenario[]): boolean => {
  for (let i = 0; i < scenarios.length; i++) {
    for (const x in scenarios[i]) {
      for (let j = 0; j < scenarios.length; j++) {
        if (i === j) {
          continue;
        }
        if (
          scenarios[j][x] !== undefined &&
          scenarios[j][x] !== scenarios[i][x]
        ) {
          return false;
        }
      }
    }
  }
  return true;
};