import { FC, useEffect, useRef } from "react";
import { MatchResult, MatchStatus, ProcessedTeam } from "../types";
import "./Match.css";
import { MatchTeam } from "./MatchTeam";

const undefinedTeam: ProcessedTeam = {
  icon: "https://am-a.akamaihd.net/image?resize=60:60&f=http%3A%2F%2Fassets.lolesports.com%2Fwatch%2Fteam-tbd.png",
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
  topPx: number;
  leftPx: number;
  team1?: ProcessedTeam;
  team2?: ProcessedTeam;
  onResult?: (result: MatchResult) => void;
  status: MatchStatus;
};

const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const getTop = (pixels: number) => (pixels * 100) / 768;
const getLeft = (pixels: number) => (pixels * 100) / 1024;

export const Match: FC<Props> = ({
  topPx,
  leftPx,
  team1,
  team2,
  onResult,
  status,
}) => {
  const previousTeam1 = usePrevious(team1);
  const previousTeam2 = usePrevious(team2);

  useEffect(() => {
    if (
      team1?.seed !== previousTeam1?.seed ||
      team2?.seed !== previousTeam2?.seed
    ) {
      if (status === 1 && team1 && team2) {
        onResult &&
          onResult({
            result: 1,
            winnerSeed: team2?.seed,
            loserSeed: team1?.seed,
          });
      } else if (status === 0 && team1 && team2) {
        onResult &&
          onResult({
            result: 0,
            winnerSeed: team1?.seed,
            loserSeed: team2?.seed,
          });
      } else {
        onResult && onResult(emptyResult);
      }
    }
  }, [team1, team2, onResult, previousTeam1, previousTeam2, status]);

  return (
    <div
      className="container"
      style={{ top: `${getTop(topPx)}%`, left: `${getLeft(leftPx)}%` }}
    >
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
        selected={team1 && team2 && status === 0}
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
        selected={team1 && team2 && status === 1}
      />
    </div>
  );
};
