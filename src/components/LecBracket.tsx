import { Match as MatchComponent } from "./Match";
import "./Bracket.css";
import { FC, useState } from "react";
import { Match, MatchResult, ProcessedTeam, ReducedScenario } from "../types";
import {
  getHigherSeed,
  getLoser,
  getLowerSeed,
  getProbabilityForPosition,
  getResult,
  getTeam,
  getWinner,
  getWorldsProbabilityForTeam,
} from "../utils/functions";
import { Position } from "./Position";
import Background from "../championships/lec/background.png";
import { lecTeams as teams } from "../championships/lec/teams";
import { lecScenarios } from "../championships/lec/scenarios";
import { Colors } from "../theme/colors";

const matchPositions: { topPx: number; leftPx: number }[] = [
  { leftPx: 100, topPx: 115 },
  { leftPx: 100, topPx: 212 },
  { leftPx: 100, topPx: 369 },
  { leftPx: 281, topPx: 369 },
  { leftPx: 462, topPx: 161 },
  { leftPx: 462, topPx: 369 },
  { leftPx: 643, topPx: 260 },
  { leftPx: 824, topPx: 161 },
];

const generateMatches = (scenario: ReducedScenario): Match[] => {
  const match1: Match = { seed1: 4, seed2: 1, result: getResult(scenario, 1) };
  const match2: Match = { seed1: 2, seed2: 3, result: getResult(scenario, 2) };
  const match3: Match = { seed1: 5, seed2: 6, result: getResult(scenario, 3) };
  const match4: Match = {
    seed1: getLowerSeed(getLoser(match1), getLoser(match2)),
    seed2: getWinner(match3),
    result: getResult(scenario, 4),
  };
  const match5: Match = {
    seed1: getWinner(match1),
    seed2: getWinner(match2),
    result: getResult(scenario, 5),
  };
  const match6: Match = {
    seed1: getHigherSeed(getLoser(match1), getLoser(match2)),
    seed2: getWinner(match4),
    result: getResult(scenario, 6),
  };
  const match7: Match = {
    seed1: getLoser(match5),
    seed2: getWinner(match6),
    result: getResult(scenario, 7),
  };
  const match8: Match = {
    seed1: getWinner(match5),
    seed2: getWinner(match7),
    result: getResult(scenario, 8),
  };
  return [match1, match2, match3, match4, match5, match6, match7, match8];
};

type Props = {};

export const LecBracket: FC<Props> = () => {
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
        percentage: getWorldsProbabilityForTeam(team, results, lecScenarios, {
          1: 1,
          2: 1,
          3: 1,
          4: 1,
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
                  bottom: "10%",
                  color: "white",
                  maxHeight: "30%",
                  width: "60%",
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
