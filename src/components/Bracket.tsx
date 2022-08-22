import { Match } from "./Match";
import "./Bracket.css";
import { FC, useState } from "react";
import { MatchResult, ProcessedTeam, Team } from "../types";
import {
  getHigherSeed,
  getLowerSeed,
  getWorldsProbabilityForTeam,
} from "../utils/functions";

type Props = {
  teams: Team[];
};

const undefinedTeam: ProcessedTeam = {
  icon: "https://am-a.akamaihd.net/image?resize=36:36&f=http%3A%2F%2Fassets.lolesports.com%2Fwatch%2Fteam-tbd.png",
  name: "TBD",
  percentage: 0,
  seed: 1,
};

export const Bracket: FC<Props> = ({ teams }) => {
  const [results, setResults] = useState<{ [index: number]: MatchResult }>({});

  const getPropsForMatch = (match: number) => ({
    onResult: (result: MatchResult) => {
      setResults((current) => ({ ...current, [match]: result }));
    },
    status: results[match]?.result,
  });

  const getTeamWithWorldsPercentage = (
    seed?: number
  ): ProcessedTeam | undefined => {
    if (seed === undefined) {
      return;
    }
    const team = teams.find((item) => item.seed === seed);
    return (
      team && {
        ...team,
        percentage: getWorldsProbabilityForTeam(team, results),
      }
    );
  };

  return (
    <div className="wrapper">
      <div className="another">
        <div className="background">
          <div className="relative">
            <Match
              left="9.765625%"
              top="14.97395833%"
              team1={getTeamWithWorldsPercentage(4)}
              team2={getTeamWithWorldsPercentage(1)}
              {...getPropsForMatch(1)}
            />
            <Match
              left="9.765625%"
              top="27.60416667%"
              team1={getTeamWithWorldsPercentage(2)}
              team2={getTeamWithWorldsPercentage(3)}
              {...getPropsForMatch(2)}
            />
            <Match
              left="9.765625%"
              top="48.046875%"
              team1={getTeamWithWorldsPercentage(5)}
              team2={getTeamWithWorldsPercentage(6)}
              {...getPropsForMatch(3)}
            />
            <Match
              left="27.44140625%"
              top="48.046875%"
              team1={getLowerSeed(
                getTeamWithWorldsPercentage(results[1]?.loserSeed),
                getTeamWithWorldsPercentage(results[2]?.loserSeed)
              )}
              team2={getTeamWithWorldsPercentage(results[3]?.winnerSeed)}
              {...getPropsForMatch(4)}
            />
            <Match
              left="45.1171875%"
              top="20.96354167%"
              team1={getTeamWithWorldsPercentage(results[1]?.winnerSeed)}
              team2={getTeamWithWorldsPercentage(results[2]?.winnerSeed)}
              {...getPropsForMatch(5)}
            />
            <Match
              left="45.1171875%"
              top="48.046875%"
              team1={getHigherSeed(
                getTeamWithWorldsPercentage(results[1]?.loserSeed),
                getTeamWithWorldsPercentage(results[2]?.loserSeed)
              )}
              team2={getTeamWithWorldsPercentage(results[4]?.winnerSeed)}
              {...getPropsForMatch(6)}
            />
            <Match
              left="62.79296875%"
              top="33.85416667%"
              team1={getTeamWithWorldsPercentage(results[5]?.loserSeed)}
              team2={getTeamWithWorldsPercentage(results[6]?.winnerSeed)}
              {...getPropsForMatch(7)}
            />
            <Match
              left="80.46875%"
              top="20.96354167%"
              team1={getTeamWithWorldsPercentage(results[5]?.winnerSeed)}
              team2={getTeamWithWorldsPercentage(results[7]?.winnerSeed)}
              {...getPropsForMatch(8)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
