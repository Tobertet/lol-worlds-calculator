import { calculateBracketStandings } from "./calculateBracketStandings";
import { BracketConfiguration } from "./types";

export const calculatePointsStandings = (configuration: BracketConfiguration) =>
  calculateBracketStandings(configuration).map(configuration.pointsSolver);
