import { FC } from "react";
import { ProcessedTeam } from "../types";
import "./Match.css";
import { MatchTeam } from "./MatchTeam";

const undefinedTeam: ProcessedTeam = {
  icon: "https://am-a.akamaihd.net/image?resize=36:36&f=http%3A%2F%2Fassets.lolesports.com%2Fwatch%2Fteam-tbd.png",
  name: "TBD",
  percentage: 0,
  seed: 1,
};

type Props = {
  top: string;
  left: string;
  team1?: ProcessedTeam;
  team2?: ProcessedTeam;
  onSetWinner?: (winner: 0 | 1 | undefined) => void;
  winner?: 0 | 1;
};

export const Match: FC<Props> = ({
  top,
  left,
  team1 = undefinedTeam,
  team2 = undefinedTeam,
  onSetWinner,
  winner,
}) => {
  return (
    <div className="container" style={{ top, left }}>
      <MatchTeam
        team={team1}
        onSelect={() => {
          onSetWinner && onSetWinner(winner === 0 ? undefined : 0);
        }}
        selected={winner === 0}
      />
      <div className="divider" />
      <MatchTeam
        team={team2}
        onSelect={() => {
          onSetWinner && onSetWinner(winner === 1 ? undefined : 1);
        }}
        selected={winner === 1}
      />
    </div>
  );
};
