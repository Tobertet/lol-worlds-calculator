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
import Background from "../championships/lpl/background.png";
import { lplTeams as teams } from "../championships/lpl/teams";
import { lplScenarios } from "../championships/lpl/scenarios";

type Props = {};

export const LplBracket: FC<Props> = () => {
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
        percentage: getWorldsProbabilityForTeam(team, results, lplScenarios, {
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
                leftPx={100}
                team1={getTeamWithWorldsPercentage(9)}
                team2={getTeamWithWorldsPercentage(8)}
                {...getPropsForMatch(1)}
              />
              <Match
                topPx={212}
                leftPx={100}
                team1={getTeamWithWorldsPercentage(7)}
                team2={getTeamWithWorldsPercentage(10)}
                {...getPropsForMatch(2)}
              />
              <Match
                topPx={115}
                leftPx={221}
                team1={getTeamWithWorldsPercentage(5)}
                team2={getTeamWithWorldsPercentage(results[1]?.winnerSeed)}
                {...getPropsForMatch(3)}
              />
              <Match
                topPx={212}
                leftPx={221}
                team1={getTeamWithWorldsPercentage(6)}
                team2={getTeamWithWorldsPercentage(results[2]?.winnerSeed)}
                {...getPropsForMatch(4)}
              />
              <Match
                topPx={115}
                leftPx={342}
                team1={getTeamWithWorldsPercentage(4)}
                team2={getTeamWithWorldsPercentage(results[3]?.winnerSeed)}
                {...getPropsForMatch(5)}
              />
              <Match
                topPx={212}
                leftPx={342}
                team1={getTeamWithWorldsPercentage(3)}
                team2={getTeamWithWorldsPercentage(results[4]?.winnerSeed)}
                {...getPropsForMatch(6)}
              />
              <Match
                topPx={115}
                leftPx={463}
                team1={getTeamWithWorldsPercentage(1)}
                team2={getTeamWithWorldsPercentage(results[5]?.winnerSeed)}
                {...getPropsForMatch(7)}
              />
              <Match
                topPx={212}
                leftPx={463}
                team1={getTeamWithWorldsPercentage(2)}
                team2={getTeamWithWorldsPercentage(results[6]?.winnerSeed)}
                {...getPropsForMatch(8)}
              />
              <Match
                topPx={161}
                leftPx={584}
                team1={getTeamWithWorldsPercentage(results[7]?.winnerSeed)}
                team2={getTeamWithWorldsPercentage(results[8]?.winnerSeed)}
                {...getPropsForMatch(9)}
              />
              <Match
                topPx={260}
                leftPx={584}
                team1={getTeamWithWorldsPercentage(results[7]?.loserSeed)}
                team2={getTeamWithWorldsPercentage(results[8]?.loserSeed)}
                {...getPropsForMatch(10)}
              />
              <Match
                topPx={260}
                leftPx={705}
                team1={getTeamWithWorldsPercentage(results[9]?.loserSeed)}
                team2={getTeamWithWorldsPercentage(results[10]?.winnerSeed)}
                {...getPropsForMatch(11)}
              />
              <Match
                topPx={161}
                leftPx={826}
                team1={getTeamWithWorldsPercentage(results[9]?.winnerSeed)}
                team2={getTeamWithWorldsPercentage(results[11]?.winnerSeed)}
                {...getPropsForMatch(12)}
              />

              <div
                style={{
                  position: "absolute",
                  left: "20%",
                  bottom: "20%",
                  color: "white",
                  maxHeight: "30%",
                  width: "60%",
                }}
              >
                <Position
                  position={1}
                  results={getProbabilityForPosition(1, results, lplScenarios)}
                  teams={teams}
                />
                <Position
                  position={2}
                  results={getProbabilityForPosition(2, results, lplScenarios)}
                  teams={teams}
                />
                <Position
                  position="RQ"
                  results={getProbabilityForPositions(
                    [3, 4, 5, 6],
                    results,
                    lplScenarios
                  )}
                  teams={teams}
                />
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "1vw",
                    color: "#ccc",
                  }}
                >
                  *The 1st and 2nd teams in Regional Qualifiers have{" "}
                  <strong
                    style={{
                      color: "#1A76E3",
                      fontSize: "1.4vw",
                    }}
                  >
                    75%
                  </strong>{" "}
                  of scenarios to make it to worlds while the 3rd and 4th have{" "}
                  <strong style={{ color: "#1A76E3", fontSize: "1.4vw" }}>
                    25%
                  </strong>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
