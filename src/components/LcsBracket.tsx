import { Match } from "./Match";
import "./Bracket.css";
import { FC, useState } from "react";
import { MatchResult, ProcessedTeam } from "../types";
import {
  getProbabilityForPosition,
  getTeam,
  getWorldsProbabilityForTeam,
} from "../utils/functions";
import { Position } from "./Position";
import Background from "../championships/lcs/background.png";
import { lcsTeams as teams } from "../championships/lcs/teams";
import { lcsScenarios } from "../championships/lcs/scenarios";

type Props = {};

export const LcsBracket: FC<Props> = () => {
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
        percentage: getWorldsProbabilityForTeam(team, results, lcsScenarios, {
          1: 1,
          2: 1,
          3: 1,
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
                team1={getTeamWithWorldsPercentage(5)}
                team2={getTeamWithWorldsPercentage(4)}
                {...getPropsForMatch(1)}
              />
              <Match
                topPx={212}
                leftPx={100}
                team1={getTeamWithWorldsPercentage(3)}
                team2={getTeamWithWorldsPercentage(6)}
                {...getPropsForMatch(2)}
              />
              <Match
                topPx={115}
                leftPx={245}
                team1={getTeamWithWorldsPercentage(1)}
                team2={getTeamWithWorldsPercentage(results[1]?.winnerSeed)}
                {...getPropsForMatch(3)}
              />
              <Match
                topPx={212}
                leftPx={245}
                team1={getTeamWithWorldsPercentage(2)}
                team2={getTeamWithWorldsPercentage(results[2]?.winnerSeed)}
                {...getPropsForMatch(4)}
              />
              <Match
                topPx={323}
                leftPx={245}
                team1={getTeamWithWorldsPercentage(results[2]?.loserSeed)}
                team2={getTeamWithWorldsPercentage(7)}
                {...getPropsForMatch(5)}
              />
              <Match
                topPx={420}
                leftPx={245}
                team1={getTeamWithWorldsPercentage(results[1]?.loserSeed)}
                team2={getTeamWithWorldsPercentage(8)}
                {...getPropsForMatch(6)}
              />
              <Match
                topPx={323}
                leftPx={390}
                team1={getTeamWithWorldsPercentage(results[3]?.loserSeed)}
                team2={getTeamWithWorldsPercentage(results[5]?.winnerSeed)}
                {...getPropsForMatch(7)}
              />
              <Match
                topPx={420}
                leftPx={390}
                team1={getTeamWithWorldsPercentage(results[4]?.loserSeed)}
                team2={getTeamWithWorldsPercentage(results[6]?.winnerSeed)}
                {...getPropsForMatch(8)}
              />
              <Match
                topPx={161}
                leftPx={535}
                team1={getTeamWithWorldsPercentage(results[3]?.winnerSeed)}
                team2={getTeamWithWorldsPercentage(results[4]?.winnerSeed)}
                {...getPropsForMatch(9)}
              />
              <Match
                topPx={369}
                leftPx={535}
                team1={getTeamWithWorldsPercentage(results[7]?.winnerSeed)}
                team2={getTeamWithWorldsPercentage(results[8]?.winnerSeed)}
                {...getPropsForMatch(10)}
              />
              <Match
                topPx={260}
                leftPx={680}
                team1={getTeamWithWorldsPercentage(results[9]?.loserSeed)}
                team2={getTeamWithWorldsPercentage(results[10]?.winnerSeed)}
                {...getPropsForMatch(11)}
              />
              <Match
                topPx={161}
                leftPx={824}
                team1={getTeamWithWorldsPercentage(results[9]?.winnerSeed)}
                team2={getTeamWithWorldsPercentage(results[11]?.winnerSeed)}
                {...getPropsForMatch(12)}
              />

              <div
                style={{
                  position: "absolute",
                  left: "20%",
                  bottom: "5%",
                  color: "white",
                  maxHeight: "30%",
                  width: "60%",
                }}
              >
                <Position
                  position={1}
                  results={getProbabilityForPosition(1, results, lcsScenarios)}
                  teams={teams}
                />
                <Position
                  position={2}
                  results={getProbabilityForPosition(2, results, lcsScenarios)}
                  teams={teams}
                />
                <Position
                  position={3}
                  results={getProbabilityForPosition(3, results, lcsScenarios)}
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
