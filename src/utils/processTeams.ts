import { State } from "../components/Bracket";
import { ProcessedTeam, Team } from "../types";
import { asd } from "./asd";

export const processTeams: (teams: Team[], caca: State) => ProcessedTeam[] = (
  teams,
  caca
) => {
  let processedTeams: ProcessedTeam[] = [];
  const filteredAsd = asd.filter((line) => {
    let valid = true;
    if (caca.match1 !== undefined && caca.match1 !== line.results[0]) {
      valid = false;
    }
    if (caca.match2 !== undefined && caca.match2 !== line.results[1]) {
      valid = false;
    }
    if (caca.match3 !== undefined && caca.match3 !== line.results[2]) {
      valid = false;
    }
    if (caca.match4 !== undefined && caca.match4 !== line.results[3]) {
      valid = false;
    }
    return valid;
  });

  for (const team of teams) {
    let count = 0;
    for (const a of filteredAsd) {
      if (a.out.includes(team.seed)) {
        count++;
      }
    }
    const percentage =
      100 - Math.round(((count * 100) / filteredAsd.length) * 100) / 100;
    processedTeams = [...processedTeams, { ...team, percentage }];
  }
  return processedTeams;
};
