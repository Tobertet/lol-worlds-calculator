import { FC, useEffect, useState } from "react";
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

const groups: { name: "A" | "B" | "C" | "D"; teams: Team[] }[] = [
  { name: "A", teams: groupATeams },
  { name: "B", teams: groupBTeams },
  { name: "C", teams: groupCTeams },
  { name: "D", teams: groupDTeams },
];

export const Worlds: FC = () => {
  const [playInsQualifiedTeams, setPlayInsQualifiedTeams] = useState<Team[]>(
    []
  );

  const [draftedGroups, setDraftedGroups] = useState<{
    A?: Team;
    B?: Team;
    C?: Team;
    D?: Team;
  }>({});

  useEffect(() => {
    for (const group in draftedGroups) {
      if (
        !playInsQualifiedTeams.find(
          (item) => item === draftedGroups[group as "A" | "B" | "C" | "D"]
        )
      ) {
        setDraftedGroups((current) => {
          const copy = { ...current };
          delete copy[group as "A" | "B" | "C" | "D"];
          return copy;
        });
        return;
      }
    }
  }, [playInsQualifiedTeams, draftedGroups]);

  useEffect(() => {
    for (const team of playInsQualifiedTeams) {
      let matchingGroups: Array<keyof typeof draftedGroups> = [];
      for (const group of groups.filter(
        (item) =>
          draftedGroups[item.name] === undefined ||
          draftedGroups[item.name] === team
      )) {
        if (
          !group.teams.find(
            (item) =>
              item.region === team.region &&
              !(team.region === "lec" && team.seed === 4)
          )
        ) {
          matchingGroups = [...matchingGroups, group.name];
        }
      }
      if (
        matchingGroups.length === 1 &&
        !(draftedGroups[matchingGroups[0]] === team)
      ) {
        setDraftedGroups({ ...draftedGroups, [matchingGroups[0]]: team });
      }
    }
  }, [playInsQualifiedTeams, draftedGroups]);

  const merge = (teams: Team[], group: "A" | "B" | "C" | "D") => {
    const teamsCopy = [...teams];
    if (draftedGroups[group]) {
      teamsCopy[3] = draftedGroups[group] as Team;
      teamsCopy[3].seed = 4;
    }
    return teamsCopy;
  };

  return (
    <>
      <h1
        style={{
          marginTop: "240px",
          marginBottom: "60px",
          color: Colors.white,
          textAlign: "center",
          fontSize: "3vw",
        }}
      >
        Play-Ins Stage
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "1.2vw",
          color: "#ccc",
        }}
      >
        *Select the teams that will make it to the Main Stage.
      </p>
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

      <p
        style={{
          marginTop: "120px",
          textAlign: "center",
          fontSize: "1.2vw",
          color: "#ccc",
        }}
      >
        *Draft the qualified teams into a Main Stage group.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "32px 5%",
          margin: "64px 5%",
        }}
      >
        {groups.map((group) => (
          <Table
            key={group.name}
            title={`Group ${group.name}`}
            totalColumns={4}
            rows={[
              {
                items: group.teams
                  .filter((item) => item.seed === 1)
                  .map((team) => ({
                    text: team.name,
                    imageUri: team.icon,
                  })),
              },
              {
                items: group.teams
                  .filter((item) => item.seed === 2)
                  .map((team) => ({
                    text: team.name,
                    imageUri: team.icon,
                  })),
              },
              {
                items: group.teams
                  .filter((item) => item.seed === 3)
                  .map((team) => ({
                    text: team.name,
                    imageUri: team.icon,
                  })),
              },
              {
                items: playInsQualifiedTeams
                  .filter(
                    (item) =>
                      !group.teams.find(
                        (t) =>
                          t.region === item.region &&
                          !(item.region === "lec" && item.seed === 4)
                      )
                  )
                  .map((team) => ({
                    text: team.name,
                    imageUri: team.icon,
                    highlight: draftedGroups[group.name] === team,
                    disabled:
                      (draftedGroups[group.name] !== undefined &&
                        draftedGroups[group.name] !== team) ||
                      Object.keys(draftedGroups)
                        .filter((item) => item !== group.name)
                        .find(
                          (item) =>
                            draftedGroups[item as "A" | "B" | "C" | "D"] ===
                            team
                        ) !== undefined,
                    onClick: () => {
                      setDraftedGroups((current) => {
                        const copy = { ...current };
                        if (draftedGroups[group.name] === team) {
                          delete copy[group.name];
                        } else {
                          copy[group.name] = team;
                        }
                        return copy;
                      });
                    },
                  })),
              },
            ]}
          ></Table>
        ))}
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
        <PlayInGroupLeague name="A" teams={merge(groupATeams, "A")} />
        <PlayInGroupLeague name="B" teams={merge(groupBTeams, "B")} />
        <PlayInGroupLeague name="C" teams={merge(groupCTeams, "C")} />
        <PlayInGroupLeague name="D" teams={merge(groupDTeams, "D")} />
      </div>
    </>
  );
};
