import { Match as MatchComponent } from "./Match";
import "./Bracket.css";
import { FC, useState } from "react";
import { Match, MatchResult, ProcessedTeam, ReducedScenario } from "../types";
import {
  getLoser,
  getResult,
  getTeam,
  getWinner,
  getWorldsProbabilityForTeam,
} from "../utils/functions";
import Background from "../championships/lec2/background.png";
import { lec2Teams as teams } from "../championships/lec2/teams";
import { lec2Scenarios } from "../championships/lec2/scenarios";
import { Colors } from "../theme/colors";
import { PlayInGroupStandings } from "./PlayInGroupStandings";

const matchPositions: { topPx: number; leftPx: number }[] = [
  { leftPx: 100, topPx: 115 },
  { leftPx: 100, topPx: 212 },
  { leftPx: 245, topPx: 164 },
  { leftPx: 245, topPx: 275 },
  { leftPx: 390, topPx: 275 },
  { leftPx: 100, topPx: 375 },
  { leftPx: 100, topPx: 473 },
  { leftPx: 245, topPx: 425 },
  { leftPx: 245, topPx: 536 },
  { leftPx: 390, topPx: 536 },
  { leftPx: 535, topPx: 255 },
  { leftPx: 535, topPx: 396 },
  { leftPx: 680, topPx: 396 },
  { leftPx: 824, topPx: 255 },
];

const generateMatches = (scenario: ReducedScenario): Match[] => {
  const match1: Match = { seed1: 5, seed2: 4, result: getResult(scenario, 1) };
  const match2: Match = { seed1: 8, seed2: 1, result: getResult(scenario, 2) };
  const match3: Match = {
    seed1: getWinner(match1),
    seed2: getWinner(match2),
    result: getResult(scenario, 3),
  };
  const match4: Match = {
    seed1: getLoser(match1),
    seed2: getLoser(match2),
    result: getResult(scenario, 4),
  };
  const match5: Match = {
    seed1: getLoser(match3),
    seed2: getWinner(match4),
    result: getResult(scenario, 5),
  };
  const match6: Match = { seed1: 7, seed2: 3, result: getResult(scenario, 6) };
  const match7: Match = { seed1: 6, seed2: 2, result: getResult(scenario, 7) };
  const match8: Match = {
    seed1: getWinner(match6),
    seed2: getWinner(match7),
    result: getResult(scenario, 8),
  };
  const match9: Match = {
    seed1: getLoser(match6),
    seed2: getLoser(match7),
    result: getResult(scenario, 9),
  };
  const match10: Match = {
    seed1: getLoser(match8),
    seed2: getWinner(match9),
    result: getResult(scenario, 10),
  };
  const match11: Match = {
    seed1: getWinner(match3),
    seed2: getWinner(match8),
    result: getResult(scenario, 11),
  };
  const match12: Match = {
    seed1: getWinner(match5),
    seed2: getWinner(match10),
    result: getResult(scenario, 12),
  };
  const match13: Match = {
    seed1: getLoser(match11),
    seed2: getWinner(match12),
    result: getResult(scenario, 13),
  };
  const match14: Match = {
    seed1: getWinner(match11),
    seed2: getWinner(match13),
    result: getResult(scenario, 14),
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
    match13,
    match14,
  ];
};

type Props = {};

export const Lec2Bracket: FC<Props> = () => {
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
        percentage: getWorldsProbabilityForTeam(team, results, lec2Scenarios, {
          1: 1,
          2: 1,
          3: 1,
          4: 1,
          5: 1,
          6: 1,
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
                Season Finals Probability (2023)
              </h1>
              <MatchComponent
                leftPx={100}
                topPx={647}
                team1={getTeamWithWorldsPercentage(teams[8].seed)}
                team2={getTeamWithWorldsPercentage(teams[9].seed)}
                result={undefined}
              />
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
                  maxWidth: "45%",
                  position: "absolute",
                  bottom: "-5%",
                  right: 0,
                }}
              >
                <PlayInGroupStandings
                  positionScenarios={lec2Scenarios}
                  teams={teams}
                  scenario={results}
                  maxPositions={6}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
