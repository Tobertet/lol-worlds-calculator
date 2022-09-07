import { FC, useEffect, useRef } from "react";
import { MatchResult, ProcessedTeam } from "../types";
import "./Match.css";
import { MatchTeam } from "./MatchTeam";

const undefinedTeam: ProcessedTeam = {
  icon: "https://am-a.akamaihd.net/image?resize=60:60&f=http%3A%2F%2Fassets.lolesports.com%2Fwatch%2Fteam-tbd.png",
  name: "TBD",
  percentage: 0,
  seed: 1,
};

type Props = {
  topPx: number;
  leftPx: number;
  team1?: ProcessedTeam;
  team2?: ProcessedTeam;
  onResult?: (result: MatchResult) => void;
  result: MatchResult;
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
  result,
}) => {
  const previousTeam1 = usePrevious(team1);
  const previousTeam2 = usePrevious(team2);

  useEffect(() => {
    if (
      team1?.seed !== previousTeam1?.seed ||
      team2?.seed !== previousTeam2?.seed
    ) {
      if (result === 1 && team1 && team2) {
        onResult && onResult(1);
      } else if (result === 0 && team1 && team2) {
        onResult && onResult(0);
      } else {
        onResult && onResult(undefined);
      }
    }
  }, [team1, team2, onResult, previousTeam1, previousTeam2, result]);

  return (
    <div
      className="container"
      style={{ top: `${getTop(topPx)}%`, left: `${getLeft(leftPx)}%` }}
    >
      <MatchTeam
        team={team1 || undefinedTeam}
        onSelect={() => {
          if (onResult && team1 && team2) {
            if (result === 0) {
              onResult(undefined);
            } else {
              onResult(0);
            }
          }
        }}
        selected={team1 && team2 && result === 0}
      />
      <div className="divider" />
      <MatchTeam
        team={team2 || undefinedTeam}
        onSelect={() => {
          if (onResult && team1 && team2) {
            if (result === 1) {
              onResult(undefined);
            } else {
              onResult(1);
            }
          }
        }}
        selected={team1 && team2 && result === 1}
      />
    </div>
  );
};
