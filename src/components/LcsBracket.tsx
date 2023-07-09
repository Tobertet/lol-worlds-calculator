import { Match as MatchComponent } from "./Match";
import "./Bracket.css";
import { FC, useState } from "react";
import { Match, MatchResult, ProcessedTeam, ReducedScenario } from "../types";
import {
  getLoser,
  getProbabilityForPosition,
  getResult,
  getTeam,
  getWinner,
  getWorldsProbabilityForTeam,
} from "../utils/functions";
import { Position } from "./Position";
import Background from "../championships/lcs/background.png";
import { lcsTeams as teams } from "../championships/lcs/teams";
import { lcsScenarios } from "../championships/lcs/scenarios";
import { Colors } from "../theme/colors";

const matchPositions: { topPx: number; leftPx: number }[] = [
  { leftPx: 100, topPx: 115 },
  { leftPx: 100, topPx: 212 },
  { leftPx: 245, topPx: 115 },
  { leftPx: 245, topPx: 212 },
  { leftPx: 245, topPx: 323 },
  { leftPx: 245, topPx: 420 },
  { leftPx: 390, topPx: 323 },
  { leftPx: 390, topPx: 420 },
  { leftPx: 535, topPx: 161 },
  { leftPx: 535, topPx: 369 },
  { leftPx: 680, topPx: 260 },
  { leftPx: 824, topPx: 161 },
];

const generateMatches = (scenario: ReducedScenario): Match[] => {
  const match1: Match = { seed1: 5, seed2: 4, result: getResult(scenario, 1) };
  const match2: Match = { seed1: 3, seed2: 6, result: getResult(scenario, 2) };
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
    seed1: getLoser(match2),
    seed2: 7,
    result: getResult(scenario, 5),
  };
  const match6: Match = {
    seed1: getLoser(match1),
    seed2: 8,
    result: getResult(scenario, 6),
  };
  const match7: Match = {
    seed1: getLoser(match3),
    seed2: getWinner(match5),
    result: getResult(scenario, 7),
  };
  const match8: Match = {
    seed1: getLoser(match4),
    seed2: getWinner(match6),
    result: getResult(scenario, 8),
  };
  const match9: Match = {
    seed1: getWinner(match3),
    seed2: getWinner(match4),
    result: getResult(scenario, 9),
  };
  const match10: Match = {
    seed1: getWinner(match7),
    seed2: getWinner(match8),
    result: getResult(scenario, 10),
  };
  const match11: Match = {
    seed1: getLoser(match9),
    seed2: getWinner(match10),
    result: getResult(scenario, 11),
  };
  const match12: Match = {
    seed1: getWinner(match9),
    seed2: getWinner(match11),
    result: getResult(scenario, 12),
  };
  return [
    match1,
    match2,
    match3,
    match4,
    match5,
    match6,
    match7,
    match8,
    match9,
    match10,
    match11,
    match12,
  ];
};

type Props = {};

export const LcsBracket: FC<Props> = () => {
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
