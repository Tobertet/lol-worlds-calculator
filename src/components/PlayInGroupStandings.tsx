import { FC, useEffect, useState } from "react";
import { PositionScenarios, Team } from "../types";
import { ReducedScenario } from "./LeagueMatches";
import { getProbabilityForPosition } from "../utils/functions";
import { Standings } from "./Standings";

type Props = {
  scenario: ReducedScenario;
  teams: Team[];
  positionScenarios: PositionScenarios;
  maxPositions?: number;
};

export const PlayInGroupStandings: FC<Props> = ({
  teams,
  scenario,
  positionScenarios,
  maxPositions,
}) => {
  const [positionCandidates, setPositionCandidates] = useState<
    { seed: number; probability: number }[][]
  >([]);

  useEffect(() => {
    const positions = teams.map((team) => team.seed);
    setPositionCandidates(
      positions.map((position) =>
        getProbabilityForPosition(position, scenario, positionScenarios)
      )
    );
  }, [scenario, positionScenarios, teams]);

  return (
    <Standings
      teams={teams}
      positions={positionCandidates
        .slice(0, maxPositions || positionCandidates.length)
        .map((candidates, index) => ({
          candidates,
          labelText: `${index + 1}`,
          labelColor: "blue",
        }))}
    />
  );
};
