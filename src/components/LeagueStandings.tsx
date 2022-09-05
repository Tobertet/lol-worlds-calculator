import { FC, useEffect } from "react";
import { EndingScenarios, Team } from "../types";
import { ReducedScenario } from "./LeagueMatches";
import { getProbabilityForPosition } from "../utils/functions";

type Props = {
  scenario: ReducedScenario;
  teams: Team[];
  positionScenarios: EndingScenarios;
};

export const LeagueStandings: FC<Props> = ({
  teams,
  scenario,
  positionScenarios,
}) => {
  useEffect(() => {
    getProbabilityForPosition(1, scenario, positionScenarios);
  }, [scenario, positionScenarios]);

  return (
    <>
      {teams.map((team, index) => {
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `2fr ${teams.map(() => "1fr").join(" ")}`,
              alignItems: "center",
              columnGap: "1%",
              marginBlock: "1%",
            }}
          >
            <span
              style={{
                fontSize: "4vw",
                color: "#1A76E3",
                textAlign: "end",
              }}
            >
              {index + 1}.{" "}
            </span>
            {/* {results.map((result) => (
              <div
                key={result.seed}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 4%",
                  minWidth: "10%",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={getTeam(teams, result.seed)?.icon}
                  alt="asd"
                />
                <span style={{ fontSize: "1vw", textAlign: "center" }}>
                  {toPercentage(result.probability)}
                </span>
              </div>
            ))} */}
          </div>
        );
      })}
    </>
  );
};
