import { Match } from "./Match";
import "./Bracket.css";
import { FC, useState } from "react";
import { MatchResult, ProcessedTeam } from "../types";
import {
  getHigherSeed,
  getLowerSeed,
  getProbabilityForPosition,
  getTeam,
  getWorldsProbabilityForTeam,
} from "../utils/functions";
import { Position } from "./Position";
import Background from "../championships/lec/background.png";
import { lecTeams as teams } from "../championships/lec/teams";
import { lecScenarios } from "../championships/lec/scenarios";

type Props = {};

export const LecBracket: FC<Props> = () => {
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
        percentage: getWorldsProbabilityForTeam(team, results, lecScenarios),
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
                leftPx={100}
                topPx={115}
                team1={getTeamWithWorldsPercentage(4)}
                team2={getTeamWithWorldsPercentage(1)}
                {...getPropsForMatch(1)}
              />
              <Match
                leftPx={100}
                topPx={212}
                team1={getTeamWithWorldsPercentage(2)}
                team2={getTeamWithWorldsPercentage(3)}
                {...getPropsForMatch(2)}
              />
              <Match
                leftPx={100}
                topPx={369}
                team1={getTeamWithWorldsPercentage(5)}
                team2={getTeamWithWorldsPercentage(6)}
                {...getPropsForMatch(3)}
              />
              <Match
                leftPx={281}
                topPx={369}
                team1={getTeamWithWorldsPercentage(
                  getLowerSeed(
                    getTeam(teams, results[1]?.loserSeed),
                    getTeam(teams, results[2]?.loserSeed)
                  )?.seed
                )}
                team2={getTeamWithWorldsPercentage(results[3]?.winnerSeed)}
                {...getPropsForMatch(4)}
              />
              <Match
                leftPx={462}
                topPx={161}
                team1={getTeamWithWorldsPercentage(results[1]?.winnerSeed)}
                team2={getTeamWithWorldsPercentage(results[2]?.winnerSeed)}
                {...getPropsForMatch(5)}
              />
              <Match
                leftPx={462}
                topPx={369}
                team1={getTeamWithWorldsPercentage(
                  getHigherSeed(
                    getTeam(teams, results[1]?.loserSeed),
                    getTeam(teams, results[2]?.loserSeed)
                  )?.seed
                )}
                team2={getTeamWithWorldsPercentage(results[4]?.winnerSeed)}
                {...getPropsForMatch(6)}
              />
              <Match
                leftPx={643}
                topPx={260}
                team1={getTeamWithWorldsPercentage(results[5]?.loserSeed)}
                team2={getTeamWithWorldsPercentage(results[6]?.winnerSeed)}
                {...getPropsForMatch(7)}
              />
              <Match
                leftPx={824}
                topPx={161}
                team1={getTeamWithWorldsPercentage(results[5]?.winnerSeed)}
                team2={getTeamWithWorldsPercentage(results[7]?.winnerSeed)}
                {...getPropsForMatch(8)}
              />

              <div
                style={{
                  position: "absolute",
                  left: "20%",
                  bottom: "10%",
                  color: "white",
                  maxHeight: "30%",
                  width: "40%",
                }}
              >
                <Position
                  position={1}
                  results={getProbabilityForPosition(1, results, lecScenarios)}
                  teams={teams}
                />
                <Position
                  position={2}
                  results={getProbabilityForPosition(2, results, lecScenarios)}
                  teams={teams}
                />
                <Position
                  position={3}
                  results={getProbabilityForPosition(3, results, lecScenarios)}
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
