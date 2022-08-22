import { Match } from "./Match";
import "./Bracket.css";
import { FC, useEffect, useState } from "react";
import { MatchResult, ProcessedTeam, Team } from "../types";
import { processTeams } from "../utils/processTeams";
import { getLoser, getLowerSeed, getWinner } from "../utils/functions";

type Props = {
  teams: Team[];
};

const undefinedTeam: ProcessedTeam = {
  icon: "https://am-a.akamaihd.net/image?resize=36:36&f=http%3A%2F%2Fassets.lolesports.com%2Fwatch%2Fteam-tbd.png",
  name: "TBD",
  percentage: 0,
  seed: 1,
};

export type State = {
  match1: MatchResult;
  match2: MatchResult;
  match3: MatchResult;
  match4: MatchResult;
  match5: MatchResult;
  match6: MatchResult;
  match7: MatchResult;
  match8: MatchResult;
};

export const Bracket: FC<Props> = ({ teams }) => {
  const [processedTeams, setProcessedTeams] = useState<ProcessedTeam[]>([
    undefinedTeam,
    undefinedTeam,
    undefinedTeam,
    undefinedTeam,
    undefinedTeam,
    undefinedTeam,
  ]);

  const [results, setResults] = useState<State>({
    match1: undefined,
    match2: undefined,
    match3: undefined,
    match4: undefined,
    match5: undefined,
    match6: undefined,
    match7: undefined,
    match8: undefined,
  });

  useEffect(() => {
    console.log(results);
    setProcessedTeams(processTeams(teams, results));
  }, [teams, results]);

  return (
    <div className="wrapper">
      <div className="another">
        <div className="background">
          <div className="relative">
            <Match
              left="9.765625%"
              top="14.97395833%"
              team1={processedTeams[3]}
              team2={processedTeams[0]}
              onSetWinner={(winner) => {
                setResults((current) => ({ ...current, match1: winner }));
              }}
              winner={results.match1}
            />
            <Match
              left="9.765625%"
              top="27.60416667%"
              team1={processedTeams[1]}
              team2={processedTeams[2]}
              onSetWinner={(winner) => {
                setResults((current) => ({ ...current, match2: winner }));
              }}
              winner={results.match2}
            />
            <Match
              left="9.765625%"
              top="48.046875%"
              team1={processedTeams[4]}
              team2={processedTeams[5]}
              onSetWinner={(winner) => {
                setResults((current) => ({ ...current, match3: winner }));
              }}
              winner={results.match3}
            />
            <Match
              left="27.44140625%"
              top="48.046875%"
              team1={getLowerSeed(
                getLoser(processedTeams[3], processedTeams[0], results.match1),
                getLoser(processedTeams[1], processedTeams[2], results.match2)
              )}
              team2={getWinner(
                processedTeams[4],
                processedTeams[5],
                results.match3
              )}
              onSetWinner={(winner) => {
                setResults((current) => ({ ...current, match4: winner }));
              }}
              winner={results.match4}
            />
            <Match
              left="45.1171875%"
              top="20.96354167%"
              team1={getWinner(
                processedTeams[3],
                processedTeams[0],
                results.match1
              )}
              team2={getWinner(
                processedTeams[1],
                processedTeams[2],
                results.match2
              )}
              onSetWinner={(winner) => {
                setResults((current) => ({ ...current, match5: winner }));
              }}
              winner={results.match5}
            />
            <Match
              left="45.1171875%"
              top="48.046875%"
              onSetWinner={(winner) => {
                setResults((current) => ({ ...current, match6: winner }));
              }}
              winner={results.match6}
            />
            <Match
              left="62.79296875%"
              top="33.85416667%"
              onSetWinner={(winner) => {
                setResults((current) => ({ ...current, match7: winner }));
              }}
              winner={results.match7}
            />
            <Match
              left="80.46875%"
              top="20.96354167%"
              onSetWinner={(winner) => {
                setResults((current) => ({ ...current, match8: winner }));
              }}
              winner={results.match8}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
