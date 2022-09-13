import * as fs from "fs";
import { calculateAllSolvedScenarios } from "./calculateAllSolvedScenarios";
import { minimizeScenarios } from "./minimizeScenarios";
import {
  PositionScenarios,
  CompleteScenario,
  ReducedScenario,
  ChampionshipConfiguration,
} from "./types";

type Options = {
  positions: number;
  seeds: number;
  outputFile: string;
};

const completeScenario2ReducedScenario = (
  scenario: CompleteScenario
): ReducedScenario => {
  let reducedScenario = {};
  for (let i = 0; i < scenario.length; i++) {
    if (scenario[i] === 1) {
      reducedScenario = { ...reducedScenario, [i + 1]: 1 };
    } else if (scenario[i] === 0) {
      reducedScenario = { ...reducedScenario, [i + 1]: 0 };
    }
  }
  return reducedScenario;
};

export const generatePositionScenarios = (
  configuration: ChampionshipConfiguration,
  {
    positions = 6,
    seeds = configuration.totalTeams,
    outputFile = "./scripts/output.json",
  }: Options = {
    positions: 6,
    seeds: configuration.totalTeams,
    outputFile: "./scripts/output.json",
  }
): PositionScenarios => {
  const scenarioStandings = calculateAllSolvedScenarios(configuration);

  let positionScenarios: PositionScenarios = {};
  for (let position = 1; position <= positions; position++) {
    positionScenarios[position] = {};
    for (let seed = 1; seed <= seeds; seed++) {
      let allScenarios: CompleteScenario[] = [];
      for (const item of scenarioStandings) {
        if (item.standings[position]?.includes(seed)) {
          allScenarios = [...allScenarios, item.scenario];
        }
      }
      positionScenarios[position][seed] = minimizeScenarios(
        allScenarios.map(completeScenario2ReducedScenario),
        configuration.totalMatches
      );
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(positionScenarios));

  return positionScenarios;
};
