import { FC, useState } from "react";
import {
  groupATeams,
  groupBTeams,
  groupCTeams,
  groupDTeams,
  playInsGroup1,
  playInsGroup2,
} from "../championships/worlds/teams";
import { Colors } from "../theme/colors";
import { Team } from "../types";
import { PlayInGroupLeague } from "./PlayInGroupLeague";
import { Table } from "./shared/Table";

export const Worlds: FC = () => {
  const [playInsQualifiedTeams, setPlayInsQualifiedTeams] = useState<Team[]>(
    []
  );

  return (
    <>
      <h1
        style={{
          marginTop: "240px",
          marginBottom: "120px",
          color: Colors.white,
          textAlign: "center",
          fontSize: "3vw",
        }}
      >
        Play-Ins Stage
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px 5%",
          margin: "64px 5%",
        }}
      >
        <div
          style={{
            border: `3px solid ${Colors.primary}`,
            borderRadius: "25px",
            padding: "20px",
          }}
        >
          <Table
            title="Group 1"
            totalColumns={playInsGroup1.length}
            rows={[
              {
                items: playInsGroup1.map((team) => ({
                  text: team.name,
                  imageUri: team.icon,
                  highlight: playInsQualifiedTeams.includes(team),
                  disabled:
                    !playInsQualifiedTeams.includes(team) &&
                    (playInsQualifiedTeams.length === 4 ||
                      playInsGroup1.reduce(
                        (a, c) =>
                          a + (playInsQualifiedTeams.includes(c) ? 1 : 0),
                        0
                      ) === 3),
                  onClick: () => {
                    if (
                      playInsQualifiedTeams.find(
                        (item) => item.name === team.name
                      )
                    ) {
                      setPlayInsQualifiedTeams(
                        playInsQualifiedTeams.filter(
                          (item) => item.name !== team.name
                        )
                      );
                    } else {
                      setPlayInsQualifiedTeams([
                        ...playInsQualifiedTeams,
                        team,
                      ]);
                    }
                  },
                })),
              },
            ]}
          ></Table>
        </div>
        <div
          style={{
            border: `3px solid ${Colors.primary}`,
            borderRadius: "25px",
            padding: "20px",
          }}
        >
          <Table
            title="Group 2"
            totalColumns={playInsGroup2.length}
            rows={[
              {
                items: playInsGroup2.map((team) => ({
                  text: team.name,
                  imageUri: team.icon,
                  highlight: playInsQualifiedTeams.includes(team),
                  disabled:
                    !playInsQualifiedTeams.includes(team) &&
                    (playInsQualifiedTeams.length === 4 ||
                      playInsGroup2.reduce(
                        (a, c) =>
                          a + (playInsQualifiedTeams.includes(c) ? 1 : 0),
                        0
                      ) === 3),
                  onClick: () => {
                    if (playInsQualifiedTeams.includes(team)) {
                      setPlayInsQualifiedTeams(
                        playInsQualifiedTeams.filter(
                          (item) => item.name !== team.name
                        )
                      );
                    } else {
                      setPlayInsQualifiedTeams([
                        ...playInsQualifiedTeams,
                        team,
                      ]);
                    }
                  },
                })),
              },
            ]}
          ></Table>
        </div>
      </div>

      <h1
        style={{
          marginTop: "140px",
          marginBottom: "100px",
          color: Colors.white,
          textAlign: "center",
          fontSize: "3vw",
        }}
      >
        Main Stage
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px 5%",
          margin: "64px 5%",
        }}
      >
        <PlayInGroupLeague name="A" teams={groupATeams} />
        <PlayInGroupLeague name="B" teams={groupBTeams} />
        <PlayInGroupLeague name="C" teams={groupCTeams} />
        <PlayInGroupLeague name="D" teams={groupDTeams} />
      </div>
    </>
  );
};
