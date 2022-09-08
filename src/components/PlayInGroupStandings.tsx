import { FC, useEffect, useState } from "react";
import { PositionScenarios, Team } from "../types";
import { ReducedScenario } from "./LeagueMatches";
import { getProbabilityForPosition } from "../utils/functions";
import { LabelColors, Standings } from "./Standings";

type Props = {
  scenario: ReducedScenario;
  teams: Team[];
  positionScenarios: PositionScenarios;
};

export const PlayInGroupStandings: FC<Props> = ({
  teams,
  scenario,
  positionScenarios,
}) => {
  const [positionCandidates, setPositionCandidates] = useState<
    { seed: number; probability: number }[][]
  >([]);

  useEffect(() => {
    setPositionCandidates([
      getProbabilityForPosition(1, scenario, positionScenarios),
      getProbabilityForPosition(2, scenario, positionScenarios),
      getProbabilityForPosition(3, scenario, positionScenarios),
      getProbabilityForPosition(4, scenario, positionScenarios),
      getProbabilityForPosition(5, scenario, positionScenarios),
      getProbabilityForPosition(6, scenario, positionScenarios),
    ]);
  }, [scenario, positionScenarios]);

  return (
    <Standings
      teams={teams}
      positions={positionCandidates.map((candidates, index) => ({
        candidates,
        labelText: `${index + 1}`,
        labelColor: LabelColors.blue,
      }))}
    />
  );
};
