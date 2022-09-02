import { calculateBracketStandings } from "./calculateBracketStandings";
import { ChampionshipConfiguration } from "./types";

export const calculatePointsStandings = (
  configuration: ChampionshipConfiguration
) => calculateBracketStandings(configuration).map(configuration.pointsSolver);
