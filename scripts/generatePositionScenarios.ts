import * as fs from "fs";
import { calculateAllSolvedScenarios } from "./calculateAllSolvedScenarios";
import { minimizeScenarios } from "./minimizeScenarios";
import {
  PositionScenarios,
  ReducedScenario,
  ChampionshipConfiguration,
  SolvedScenario,
} from "./types";

type Options = {
  positions: number;
  seeds: number;
  outputFile: string;
};

const solvedScenario2ReducedScenario =
  (position: number) =>
  (solvedScenario: SolvedScenario): ReducedScenario => {
    let reducedScenario: ReducedScenario = {};
    for (let i = 0; i < solvedScenario.scenario.length; i++) {
      if (solvedScenario.scenario[i] !== undefined) {
        reducedScenario = {
          ...reducedScenario,
          [i + 1]: solvedScenario.scenario[i],
        };
      }
    }
    if (solvedScenario.standings[position].length > 1) {
      reducedScenario.meta = {
        share: 1 / solvedScenario.standings[position].length,
      };
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
      let allScenarios: SolvedScenario[] = [];
      for (const item of scenarioStandings) {
        if (item.standings[position]?.includes(seed)) {
          allScenarios = [...allScenarios, item];
        }
      }
      positionScenarios[position][seed] = minimizeScenarios(
        allScenarios.map(solvedScenario2ReducedScenario(position)),
        configuration.totalMatches
      );
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(positionScenarios));

  return positionScenarios;
};
