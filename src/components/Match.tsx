import { FC } from "react";
import { MatchResult, MatchStatus, ProcessedTeam } from "../types";
import "./Match.css";
import { MatchTeam } from "./MatchTeam";

const undefinedTeam: ProcessedTeam = {
  icon: "https://am-a.akamaihd.net/image?resize=36:36&f=http%3A%2F%2Fassets.lolesports.com%2Fwatch%2Fteam-tbd.png",
  name: "TBD",
  percentage: 0,
  seed: 1,
};

const emptyResult: MatchResult = {
  result: undefined,
  loserSeed: undefined,
  winnerSeed: undefined,
};

type Props = {
  top: string;
  left: string;
  team1?: ProcessedTeam;
  team2?: ProcessedTeam;
  onResult?: (result: MatchResult) => void;
  status: MatchStatus;
};

export const Match: FC<Props> = ({
  top,
  left,
  team1,
  team2,
  onResult,
  status,
}) => {
  return (
    <div className="container" style={{ top, left }}>
      <MatchTeam
        team={team1 || undefinedTeam}
        onSelect={() => {
          if (onResult && team1 && team2) {
            if (status === 0) {
              onResult(emptyResult);
            } else {
              onResult({
                result: 0,
                loserSeed: team2.seed,
                winnerSeed: team1.seed,
              });
            }
          }
        }}
        selected={status === 0}
      />
      <div className="divider" />
      <MatchTeam
        team={team2 || undefinedTeam}
        onSelect={() => {
          if (onResult && team1 && team2) {
            if (status === 1) {
              onResult(emptyResult);
            } else {
              onResult({
                result: 1,
                loserSeed: team1.seed,
                winnerSeed: team2.seed,
              });
            }
          }
        }}
        selected={status === 1}
      />
    </div>
  );
};
