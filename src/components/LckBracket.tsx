import { Match as MatchComponent } from "./Match";
import "./Bracket.css";
import { FC, useState } from "react";
import { Match, MatchResult, ProcessedTeam, ReducedScenario } from "../types";
import {
  getProbabilityForPosition,
  getProbabilityForPositions,
  getResult,
  getTeam,
  getWinner,
  getWorldsProbabilityForTeam,
} from "../utils/functions";
import { Position } from "./Position";
import Background from "../championships/lck/background.png";
import { lckTeams as teams } from "../championships/lck/teams";
import { lckScenarios } from "../championships/lck/scenarios";
import { Colors } from "../theme/colors";

const matchPositions: { topPx: number; leftPx: number }[] = [
  { leftPx: 281, topPx: 115 },
  { leftPx: 281, topPx: 212 },
  { leftPx: 462, topPx: 115 },
  { leftPx: 462, topPx: 212 },
  { leftPx: 643, topPx: 161 },
];

const generateMatches = (scenario: ReducedScenario): Match[] => {
  const match1: Match = { seed1: 3, seed2: 6, result: getResult(scenario, 1) };
  const match2: Match = { seed1: 4, seed2: 5, result: getResult(scenario, 2) };
  const match3: Match = {
    seed1: 1,
    seed2: getWinner(match1),
    result: getResult(scenario, 3),
  };
  const match4: Match = {
    seed1: 2,
    seed2: getWinner(match2),
    result: getResult(scenario, 4),
  };
  const match5: Match = {
    seed1: getWinner(match3),
    seed2: getWinner(match4),
    result: getResult(scenario, 5),
  };
  return [match1, match2, match3, match4, match5];
};

type Props = {};

export const LckBracket: FC<Props> = () => {
  const [results, setResults] = useState<ReducedScenario>({});

  const getPropsForMatch = (match: number) => ({
    onResult: (result: MatchResult) => {
      setResults((current) => {
        if (result === undefined) {
          const copy = { ...current };
          delete copy[match];
          return copy;
        } else {
          return { ...current, [match]: result };
        }
      });
    },
    result: results[match],
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
                  color: Colors.white,
                  textAlign: "center",
                  position: "absolute",
                  top: "4%",
                  width: "100%",
                  fontSize: "2.5vw",
                }}
              >
                Worlds Probability (2022)
              </h1>
              {generateMatches(results).map((match, index) => (
                <MatchComponent
                  key={index}
                  {...matchPositions[index]}
                  team1={getTeamWithWorldsPercentage(match.seed1)}
                  team2={getTeamWithWorldsPercentage(match.seed2)}
                  {...getPropsForMatch(index + 1)}
                />
              ))}
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
                      color: Colors.primary,
                      fontSize: "1.4vw",
                    }}
                  >
                    75%
                  </strong>{" "}
                  of scenarios to make it to worlds while the 3rd and 4th have{" "}
                  <strong style={{ color: Colors.primary, fontSize: "1.4vw" }}>
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
