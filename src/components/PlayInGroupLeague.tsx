import { FC, useState } from "react";
import { groupsLeagueScenarios } from "../championships/worlds/groupsLeagueScenarios";
import { Colors } from "../theme/colors";
import { Team } from "../types";
import { LeagueMatches, ReducedScenario } from "./LeagueMatches";
import { PlayInGroupStandings } from "./PlayInGroupStandings";

type Props = {
  teams: Team[];
  name: string;
  standingsPosition?: "left" | "right";
};

export const PlayInGroupLeague: FC<Props> = ({
  teams,
  name,
  standingsPosition = "right",
}) => {
  const [scenario, setScenario] = useState<ReducedScenario>({});

  return (
    <div>
      <h2
        style={{
          color: Colors.white,
          textAlign: "start",
          fontSize: "1.4vw",
        }}
      >
        Group {name}
      </h2>
      <div
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: standingsPosition === "left" ? "row-reverse" : "row",
        }}
      >
        <div style={{ width: "100%" }}>
          <LeagueMatches
            scenario={scenario}
            setScenario={setScenario}
            teams={teams}
            matches={[
              { team1: 1, team2: 2 },
              { team1: 1, team2: 2 },
              { team1: 1, team2: 3 },
              { team1: 1, team2: 3 },
              { team1: 1, team2: 4 },
              { team1: 1, team2: 4 },
              { team1: 2, team2: 3 },
              { team1: 2, team2: 3 },
              { team1: 2, team2: 4 },
              { team1: 2, team2: 4 },
              { team1: 3, team2: 4 },
              { team1: 3, team2: 4 },
            ]}
          />
        </div>
        <div style={{ width: "100%" }}>
          <PlayInGroupStandings
            positionScenarios={groupsLeagueScenarios}
            scenario={scenario}
            teams={teams}
          />
        </div>
      </div>
    </div>
  );
};
