import { Match } from "./Match";
import "./Bracket.css";
import { FC, useState } from "react";
import { MatchResult, ProcessedTeam } from "../types";
import {
  getProbabilityForPosition,
  getProbabilityForPositions,
  getTeam,
  getWorldsProbabilityForTeam,
} from "../utils/functions";
import { Position } from "./Position";
import Background from "../championships/lck/background.png";
import { lckTeams as teams } from "../championships/lck/teams";
import { lckScenarios } from "../championships/lck/scenarios";

type Props = {};

export const LckBracket: FC<Props> = () => {
  const [results, setResults] = useState<{ [index: number]: MatchResult }>({});

  const getPropsForMatch = (match: number) => ({
    onResult: (result: MatchResult) => {
      setResults((current) => {
        if (result.result === undefined) {
          const copy = { ...current };
          delete copy[match];
          return copy;
        } else {
          return { ...current, [match]: result };
        }
      });
    },
    status: results[match]?.result,
  });

  const getTeamWithWorldsPercentage = (
    seed?: number
  ): ProcessedTeam | undefined => {
    const team = getTeam(teams, seed);
    return (
      team && {
        ...team,
        percentage: getWorldsProbabilityForTeam(team, results, lckScenarios, {
          1: 1,
          2: 1,
          3: 0.75,
          4: 0.75,
          5: 0.25,
          6: 0.25,
        }),
      }
    );
  };

  return (
    <>
      <div className="wrapper">
        <div className="another">
          <div
            className="background"
            style={{
              backgroundImage: `url(${Background})`,
            }}
          >
            <div className="relative">
              <h1
                style={{
                  color: "#eee",
                  textAlign: "center",
                  position: "absolute",
                  top: "4%",
                  width: "100%",
                  fontSize: "2.5vw",
                }}
              >
                Worlds Probability
              </h1>
              <Match
                topPx={115}
                leftPx={281}
                team1={getTeamWithWorldsPercentage(3)}
                team2={getTeamWithWorldsPercentage(6)}
                {...getPropsForMatch(1)}
              />
              <Match
                topPx={212}
                leftPx={281}
                team1={getTeamWithWorldsPercentage(4)}
                team2={getTeamWithWorldsPercentage(5)}
                {...getPropsForMatch(2)}
              />
              <Match
                topPx={115}
                leftPx={462}
                team1={getTeamWithWorldsPercentage(1)}
                team2={getTeamWithWorldsPercentage(results[1]?.winnerSeed)}
                {...getPropsForMatch(3)}
              />
              <Match
                topPx={212}
                leftPx={462}
                team1={getTeamWithWorldsPercentage(2)}
                team2={getTeamWithWorldsPercentage(results[2]?.winnerSeed)}
                {...getPropsForMatch(4)}
              />
              <Match
                topPx={161}
                leftPx={643}
                team1={getTeamWithWorldsPercentage(results[3]?.winnerSeed)}
                team2={getTeamWithWorldsPercentage(results[4]?.winnerSeed)}
                {...getPropsForMatch(5)}
              />
              <div
                style={{
                  position: "absolute",
                  left: "20%",
                  bottom: "30%",
                  color: "white",
                  maxHeight: "30%",
                  width: "60%",
                }}
              >
                <Position
                  position={1}
                  results={getProbabilityForPosition(1, results, lckScenarios)}
                  teams={teams}
                />
                <Position
                  position={2}
                  results={getProbabilityForPosition(2, results, lckScenarios)}
                  teams={teams}
                />
                <Position
                  position="RQ"
                  results={getProbabilityForPositions(
                    [3, 4, 5, 6],
                    results,
                    lckScenarios
                  )}
                  teams={teams}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
