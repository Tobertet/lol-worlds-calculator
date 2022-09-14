import {
  Match,
  MatchResult,
  PositionScenarios,
  ReducedScenario,
  Team,
} from "../types";

export const getLowerSeed = (seed1?: number, seed2?: number) =>
  seed1 && seed2 ? (seed1 > seed2 ? seed1 : seed2) : undefined;

export const getHigherSeed = (seed1?: number, seed2?: number) =>
  seed1 && seed2 ? (seed1 > seed2 ? seed2 : seed1) : undefined;

export const getLoser = (match: Match) =>
  match.result === undefined
    ? undefined
    : match.result === 1
    ? match.seed1
    : match.seed2;

export const getWinner = (match: Match) =>
  match.result === undefined
    ? undefined
    : match.result === 1
    ? match.seed2
    : match.seed1;

export const getResult = (scenario: ReducedScenario, match: number) =>
  scenario[match];

export const getTeam = (teams: Team[], seed?: number): Team | undefined => {
  if (seed === undefined) {
    return;
  }
  return teams.find((item) => item.seed === seed);
};

export const toPercentage = (value: number) =>
  `${Math.round(value * 10000) / 100}%`;

export const getProbabilityForPosition = (
  position: number,
  scenario: ReducedScenario,
  positionScenarios: PositionScenarios
): { seed: number; probability: number }[] => {
  const seedScenarios = positionScenarios[position];

  let processedSeeds: { seed: number; probability: number }[] = [];
  for (const seed in seedScenarios) {
    let processedScenarios: {
      scenarioLength: number;
      matchLength: number;
      share: number;
    }[] = [];
    for (const seedScenario of seedScenarios[seed]) {
      const matchingElements = Object.keys(scenario)
        .filter((key) => key !== "meta")
        .filter((val) =>
          Object.keys(seedScenario)
            .filter((key) => key !== "meta")
            .includes(val)
        );
      if (intersect([scenario, seedScenario])) {
        processedScenarios = [
          ...processedScenarios,
          {
            matchLength: matchingElements.length,
            scenarioLength: Object.keys(seedScenario).filter(
              (key) => key !== "meta"
            ).length,
            share: seedScenario.meta?.share || 1,
          },
        ];
      }
    }

    let amount = 0;
    for (const processedScenario of processedScenarios) {
      amount +=
        Math.pow(
          2,
          processedScenario.matchLength - processedScenario.scenarioLength
        ) * processedScenario.share;
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
  scenarios: PositionScenarios
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
  scenarios: PositionScenarios,
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

const intersect = (scenarios: ReducedScenario[]): boolean => {
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
