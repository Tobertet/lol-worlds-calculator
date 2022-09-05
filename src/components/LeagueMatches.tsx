import { FC } from "react";
import { MatchStatus, Team } from "../types";
import { getTeam } from "../utils/functions";

export type MatchResult = 0 | 1 | undefined;

export type ReducedScenario = {
  [match: number]: MatchResult;
};

type Match = {
  team1: number;
  team2: number;
};

const undefinedTeam: Team = {
  icon: "https://am-a.akamaihd.net/image?resize=60:60&f=http%3A%2F%2Fassets.lolesports.com%2Fwatch%2Fteam-tbd.png",
  name: "TBD",
  seed: 1,
};

type Props = {
  scenario: ReducedScenario;
  setScenario: React.Dispatch<React.SetStateAction<ReducedScenario>>;
  teams: Team[];
  matches: Match[];
};

export const LeagueMatches: FC<Props> = ({
  scenario,
  setScenario,
  teams,
  matches,
}) => (
  <>
    {matches.map((match, index) => (
      <LeagueMatch
        key={`${match.team1}:${match.team2}`}
        team1={getTeam(teams, match.team1) || undefinedTeam}
        team2={getTeam(teams, match.team2) || undefinedTeam}
        status={scenario[index + 1]}
        onResult={(result) => {
          setScenario((scenario) => ({ ...scenario, [index + 1]: result }));
        }}
      />
    ))}
  </>
);

type LeagueMatchProps = {
  team1: Team;
  team2: Team;
  onResult?: (result: MatchResult) => void;
  status: MatchStatus;
};

const LeagueMatch: FC<LeagueMatchProps> = ({
  team1,
  team2,
  status,
  onResult,
}) => (
  <div
    style={{
      display: "flex",
      background: "#131313",
      justifyContent: "space-evenly",
      marginBottom: "2px",
    }}
  >
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: team1.name === "TBD" ? "not-allowed" : "pointer",
        borderLeft: `3px solid ${status === 0 ? "#1A76E3" : "transparent"}`,
        justifyContent: "center",
      }}
      onClick={() => {
        if (onResult) {
          if (status === 0) {
            onResult(undefined);
          } else {
            onResult(0);
          }
        }
      }}
    >
      <img
        src={team1.icon}
        alt={`team ${team1.name} icon`}
        style={{ opacity: status === 1 ? 0.25 : 1 }}
      />
      <span
        style={{
          color: status === 1 ? "gray" : "#fff",
        }}
      >
        {team1.name}
      </span>
    </div>
    <div
      className="divider"
      style={{ minWidth: "1px", backgroundColor: "gray" }}
    ></div>
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: team1.name === "TBD" ? "not-allowed" : "pointer",
        borderRight: `5px solid ${status === 1 ? "#1A76E3" : "transparent"}`,
        justifyContent: "center",
      }}
      onClick={() => {
        if (team2.name !== "TBD" && onResult) {
          if (status === 1) {
            onResult(undefined);
          } else {
            onResult(1);
          }
        }
      }}
    >
      <span
        style={{
          color: status === 0 ? "gray" : "#fff",
        }}
      >
        {team2.name}
      </span>
      <img
        src={team2.icon}
        alt={`team ${team2.name} icon`}
        style={{ opacity: status === 0 ? 0.25 : 1 }}
      />
    </div>
  </div>
);
