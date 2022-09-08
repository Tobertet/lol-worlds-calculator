import { FC, useState } from "react";
import { lecScenarios } from "../championships/lec/scenarios";
import { lecTeams } from "../championships/lec/teams";
import { Team } from "../types";
import { LeagueMatches, ReducedScenario } from "./LeagueMatches";
import { PlayInGroupStandings } from "./PlayInGroupStandings";

type Props = {
  teams: Team[];
};

export const PlayInGroupLeague: FC<Props> = ({ teams }) => {
  const [scenario, setScenario] = useState<ReducedScenario>({});

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        marginTop: "200px",
        display: "flex",
      }}
    >
      <div style={{ width: "100%", margin: "5%" }}>
        <LeagueMatches
          scenario={scenario}
          setScenario={setScenario}
          teams={teams}
          matches={[
            { team1: 1, team2: 2 },
            { team1: 1, team2: 3 },
            { team1: 1, team2: 4 },
            { team1: 1, team2: 5 },
            { team1: 1, team2: 6 },
            { team1: 2, team2: 3 },
            { team1: 2, team2: 4 },
            { team1: 2, team2: 5 },
            { team1: 2, team2: 6 },
            { team1: 3, team2: 4 },
            { team1: 3, team2: 5 },
            { team1: 3, team2: 6 },
            { team1: 4, team2: 5 },
            { team1: 4, team2: 6 },
            { team1: 5, team2: 6 },
          ]}
        />
      </div>
      <div style={{ width: "100%", margin: "5%" }}>
        <PlayInGroupStandings
          positionScenarios={lecScenarios}
          scenario={scenario}
          teams={teams}
        />
      </div>
    </div>
  );
};
