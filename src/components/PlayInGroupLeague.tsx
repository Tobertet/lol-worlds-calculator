import { FC, useState } from "react";
import { groupsLeagueScenarios } from "../championships/worlds/groupsLeagueScenarios";
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
      <div style={{ width: "100%", margin: "5%" }}>
        <PlayInGroupStandings
          positionScenarios={groupsLeagueScenarios}
          scenario={scenario}
          teams={teams}
        />
      </div>
    </div>
  );
};
