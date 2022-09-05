import { FC, useState } from "react";
import { lecTeams } from "../championships/lec/teams";
import { LeagueMatches, ReducedScenario } from "./LeagueMatches";
import { LeagueStandings } from "./LeagueStandings";

type Props = {};

export const PlayInLeague: FC<Props> = () => {
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
          teams={lecTeams}
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
        <LeagueStandings scenario={scenario} teams={lecTeams} scenarios={} />
      </div>
    </div>
  );
};
