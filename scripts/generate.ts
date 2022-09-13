import { generatePositionScenarios } from "./generatePositionScenarios";
import { ChampionshipConfiguration } from "./types";
import { argv } from "process";
import { worldsGroupsLeagueConfiguration } from "./configurations/worlds/groupsLeague";
import { lcsConfiguration } from "./configurations/lcs";
import { lecConfiguration } from "./configurations/lec";
import { lckConfiguration } from "./configurations/lck";
import { lplConfiguration } from "./configurations/lpl";

type AvailableConfigurations = {
  worldsGroups: ChampionshipConfiguration;
  lec: ChampionshipConfiguration;
  lcs: ChampionshipConfiguration;
  lck: ChampionshipConfiguration;
  lpl: ChampionshipConfiguration;
};

const availableConfigurations: AvailableConfigurations = {
  worldsGroups: worldsGroupsLeagueConfiguration,
  lec: lecConfiguration,
  lcs: lcsConfiguration,
  lck: lckConfiguration,
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

generatePositionScenarios(
  availableConfigurations[argv[2] as keyof AvailableConfigurations]
);
