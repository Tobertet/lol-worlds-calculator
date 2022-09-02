import { calculateChampionshipPointsStandings } from "./calculateChampionshipPointsStandings";
import { EndingScenarios, PlayoffsScenario, ReducedScenario } from "./types";
import * as fs from "fs";
import { minimizeScenarios } from "./minimizeScenarios";

const scenarioStandings = calculateChampionshipPointsStandings();

const scenario2ReducedScenario = (
  scenario: PlayoffsScenario
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

const calculateEndingScenarios = (): EndingScenarios => {
  let endingScenarios: EndingScenarios = {};
  for (let position = 1; position <= 6; position++) {
    endingScenarios[position] = {};
    for (let seed = 1; seed <= 10; seed++) {
      let allScenarios: PlayoffsScenario[] = [];
      // let allScenarios: number[] = [];
      for (const item of scenarioStandings) {
        if (item.standings[position - 1] === seed) {
          // allScenarios = [...allScenarios, binary2Number(item.scenario)];
          allScenarios = [...allScenarios, item.scenario];
        }
      }
      // endingScenarios[position][seed] = implicants2Scenarios(
      //   getEssentialPrimeImplicants(
      //     getEssentialPrimeImplicants(getPrimeImplicants(allScenarios, []))
      //   )
      // );
      console.log(
        `Generating scenarios for position: ${position} and seed ${seed}`
      );
      endingScenarios[position][seed] = minimizeScenarios(
        allScenarios.map(scenario2ReducedScenario),
        12
      );
    }
  }
  return endingScenarios;
};

fs.writeFileSync(
  "./scripts/output.json",
  JSON.stringify(calculateEndingScenarios())
);
