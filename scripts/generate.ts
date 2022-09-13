import { generatePositionScenarios } from "./generatePositionScenarios";
import { ChampionshipConfiguration } from "./types";
import { lplConfiguration } from "./configurations/lpl";
import { argv } from "process";
import { lecConfiguration } from "./configurations/lec";
import { lcsConfiguration } from "./configurations/lcs";
import { lckConfiguration } from "./configurations/lck";
import { playInsConfiguration } from "./configurations/worlds/playIns";
import { worldsMainConfiguration } from "./configurations/worlds/groupsStage";

type AvailableConfigurations = {
  lpl: ChampionshipConfiguration;
  lec: ChampionshipConfiguration;
  lcs: ChampionshipConfiguration;
  lck: ChampionshipConfiguration;
  playIns: ChampionshipConfiguration;
  worldsMain: ChampionshipConfiguration;
};

const availableConfigurations: AvailableConfigurations = {
  lpl: lplConfiguration,
  lec: lecConfiguration,
  lcs: lcsConfiguration,
  lck: lckConfiguration,
  playIns: playInsConfiguration,
  worldsMain: worldsMainConfiguration,
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
