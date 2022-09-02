import { generatePositionScenarios } from "./generatePositionScenarios";
import { BracketConfiguration } from "./types";
import { lplConfiguration } from "./configurations/lpl";
import { argv } from "process";

type AvailableConfigurations = {
  lpl: BracketConfiguration;
};

const availableConfigurations: AvailableConfigurations = {
  lpl: lplConfiguration,
};

if (!argv[2]) {
  throw Error(
    `Please provide a valid championship option [${Object.keys(
      availableConfigurations
    )}]`
  );
}

if (!Object.keys(availableConfigurations).includes(argv[2])) {
  throw Error(`Unrecognized championship option ${argv[2]}`);
}

generatePositionScenarios(availableConfigurations[argv[2]]);
