import { FC } from "react";
import { Colors } from "../theme/colors";
import { Team } from "../types";
import { getTeam, toPercentage } from "../utils/functions";
import { Table } from "./shared/Table";

const labelColors = {
  gold: "#DEC43E",
  siler: "#a7a59a",
  bronze: "#bb5b09",
  blue: Colors.primary,
};

type Props = {
  teams: Team[];
  positions: {
    labelText: string;
    labelColor: keyof typeof labelColors;
    candidates: { seed: number; probability: number }[];
  }[];
};

export const Standings: FC<Props> = ({ positions, teams }) => (
  <Table
    totalColumns={teams.length}
    rows={positions.map((position) => ({
      labelColor: labelColors[position.labelColor],
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
