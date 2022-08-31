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
  scenarios: EndingScenarios,
  worldsSpots: number = 4
): number => {
  let accumulatedProbability = 0;

  for (let i = 1; i <= worldsSpots; i++) {
    accumulatedProbability +=
      getProbabilityForPosition(i, results, scenarios).find(
        (x) => x.seed === team.seed
      )?.probability || 0;
  }

  return Math.round(accumulatedProbability * 10000) / 100;
};

const module = (scenario: PlayoffsScenario, dimensions: number) =>
  Math.pow(2, dimensions) / Math.pow(2, Object.keys(scenario).length);

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

const intersection = (scenarios: PlayoffsScenario[]): PlayoffsScenario => {
  if (!intersect(scenarios)) {
    throw Error("Scenarios do not intersect");
  }
  let intersection: PlayoffsScenario = {};
  for (let i = 0; i < scenarios.length; i++) {
    for (const x in scenarios[i]) {
      intersection[x] = scenarios[i][x];
    }
  }
  return intersection;
};

const intersectionModule = (
  scenarios: PlayoffsScenario[],
  dimensions: number
): number => {
  try {
    return module(intersection(scenarios), dimensions);
  } catch (e) {
    return 0;
  }
};

const group = (
  current: PlayoffsScenario[],
  others: PlayoffsScenario[],
  size: number
): PlayoffsScenario[][] => {
  if (current.length === size) {
    return [current];
  }
  if (others.length === 0) {
    return [];
  }
  return others.flatMap((value, index) =>
    group(
      [...current, value],
      others.length === 1 || index === others.length - 1
        ? []
        : others.slice(-others.length + index + 1),
      size
    )
  );
};

export const calculateUniqueScenariosCount = (
  scenario: PlayoffsScenario,
  overlappingScenarios: PlayoffsScenario[],
  dimensions: number
) =>
  Array.from({ length: dimensions }, (_, i) => i + 1)
    .map((groupSize) => group([scenario], overlappingScenarios, groupSize))
    .map((groupedScenariosBySize) =>
      groupedScenariosBySize
        .map((groupedScenarios) =>
          intersectionModule(groupedScenarios, dimensions)
        )
        .reduce((prev, current) => prev + current, 0)
    )
    .map((value, index) => (index % 2 === 0 ? value : -value))
    .reduce((prev, current) => prev + current, 0);
