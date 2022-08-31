import {
  getEssentialPrimeImplicants,
  getPrimeImplicants,
} from "quine-mccluskey/dist";
import Implicant from "quine-mccluskey/dist/implicant";
import { calculateChampionshipPointsStandings } from "./calculateChampionshipPointsStandings";
import { EndingScenarios, ReducedScenario } from "./types";
import * as fs from "fs";

const scenarioStandings = calculateChampionshipPointsStandings();

const binary2Number = (binaryArray: number[]) => {
  const binaryString = binaryArray.join("");
  return parseInt(binaryString, 2);
};

const implicants2Scenarios = (implicants: Implicant[]) =>
  implicants.map((implicant) => {
    const binaryCommon = implicant
      .getCommonBits()
      .toString(2)
      .padStart(12, "0");
    const binaryUncommon = implicant
      .getUncommonBits()
      .toString(2)
      .padStart(12, "0");

    let scenario: ReducedScenario = {};
    for (let i = 0; i < 12; i++) {
      if (binaryCommon.charAt(i) === "1") {
        scenario = { ...scenario, [i + 1]: 1 };
      } else if (binaryUncommon.charAt(i) === "0") {
        scenario = { ...scenario, [i + 1]: 0 };
      }
    }
    return scenario;
  });

const calculateEndingScenarios = (): EndingScenarios => {
  let endingScenarios: EndingScenarios = {};
  for (let position = 1; position <= 6; position++) {
    endingScenarios[position] = {};
    for (let seed = 1; seed <= 10; seed++) {
      let allScenarios: number[] = [];
      for (const item of scenarioStandings) {
        if (item.standings[position - 1] === seed) {
          allScenarios = [...allScenarios, binary2Number(item.scenario)];
        }
      }
      endingScenarios[position][seed] = implicants2Scenarios(
        getEssentialPrimeImplicants(
          getEssentialPrimeImplicants(getPrimeImplicants(allScenarios, []))
        )
      );
      console.log(
        `pos: ${position}, seed: ${seed} [${endingScenarios[position][seed].length}]`
      );
    }
  }
  return endingScenarios;
};

fs.writeFileSync(
  "./scripts/output.json",
  JSON.stringify(calculateEndingScenarios())
);
