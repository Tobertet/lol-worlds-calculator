import { FC } from "react";
import { Team } from "../types";
import { getTeam, toPercentage } from "../utils/functions";
import { Table } from "./shared/Table";

export enum LabelColors {
  gold = "#DEC43E",
  siler = "#a7a59a",
  bronze = "#bb5b09",
  blue = "#1A76E3",
}

type Props = {
  teams: Team[];
  positions: {
    labelText: string;
    labelColor: LabelColors;
    candidates: { seed: number; probability: number }[];
  }[];
};

export const Standings: FC<Props> = ({ positions, teams }) => (
  <Table
    totalColumns={teams.length}
    rows={positions.map((position) => ({
      labelColor: position.labelColor,
      labelText: position.labelText,
      items: position.candidates.map((candidate) => {
        const team = getTeam(teams, candidate.seed)!;
        return {
          imageUri: team.icon,
          text: toPercentage(candidate.probability),
        };
      }),
    }))}
  />
);
