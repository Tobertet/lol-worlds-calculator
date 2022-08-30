import { getPrimeImplicants } from "quine-mccluskey/dist";
import { calculateResults } from "./calculateResults";

const TEAM_SEED = 6;
const FINAL_POSITION = 2;

const asd = calculateResults();

const parseArray = (arr) => {
  const binaryString = arr.join("");
  return parseInt(binaryString, 2);
};

let myArray: number[] = [];
for (const caca of asd) {
  if (caca.results[FINAL_POSITION - 1].seed === TEAM_SEED) {
    myArray = [...myArray, parseArray(caca.scenario)];
  }
}

const primeImplicants = getPrimeImplicants(myArray, []);

const scenarios = primeImplicants.map((implicant) => {
  const binaryCommon = implicant.getCommonBits().toString(2).padStart(12, "0");
  const binaryUncommon = implicant
    .getUncommonBits()
    .toString(2)
    .padStart(12, "0");

  let scenario = {};
  for (let i = 0; i < 12; i++) {
    if (binaryCommon.charAt(i) === "1") {
      scenario = { ...scenario, [i + 1]: 1 };
    } else if (binaryUncommon.charAt(i) === "0") {
      scenario = { ...scenario, [i + 1]: 0 };
    }
  }
  return scenario;
});

console.log(scenarios);
