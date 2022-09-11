import * as fs from "fs";
import { calculatePointsStandings } from "./calculatePointsStandings";
import { minimizeScenarios } from "./minimizeScenarios";
import {
  ChampionshipConfiguration,
  PositionScenarios,
  CompleteScenario,
  ReducedScenario,
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
  for (let i = 0; i < 12; i++) {
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
  const scenarioStandings = calculatePointsStandings(configuration);

  let positionScenarios: PositionScenarios = {};
  for (let position = 1; position <= positions; position++) {
    positionScenarios[position] = {};
    for (let seed = 1; seed <= seeds; seed++) {
      let allScenarios: CompleteScenario[] = [];
      for (const item of scenarioStandings) {
        console.log(item.standings);
        if (item.standings[position - 1]?.includes(seed)) {
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
