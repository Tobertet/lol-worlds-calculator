import { calculatePlayoffsScenariosStandings } from "./calculatePlayoffsScenariosStandings";
import { ScenarioStandings } from "./types";

const teams: { seed: number; springPoints: number }[] = [
  { seed: 1, springPoints: 70 },
  { seed: 2, springPoints: 30 },
  { seed: 3, springPoints: 50 },
  { seed: 4, springPoints: 90 },
  { seed: 5, springPoints: 10 },
  { seed: 6, springPoints: 20 },
  { seed: 7, springPoints: 20 },
  { seed: 8, springPoints: 0 },
  { seed: 9, springPoints: 0 },
  { seed: 10, springPoints: 10 },
];

const summerChampionshipPoints: { [position: number]: number } = {
  1: 10000,
  2: 110,
  3: 80,
  4: 60,
  5: 40,
  6: 40,
  7: 10,
  8: 10,
  9: 0,
  10: 0,
};

type ChampionshipPointsResult = {
  seed: number;
  summerPoints: number;
  championshipPoints: number;
};

export const calculateChampionshipPointsStandings = () => {
  const playoffsResults = calculatePlayoffsScenariosStandings();

  return playoffsResults.map<ScenarioStandings>((playoffsResult) => {
    let results: ChampionshipPointsResult[] = [];
    for (const index in playoffsResult.standings) {
      const seed = playoffsResult.standings[index];
      results = [
        ...results,
        {
          seed,
          summerPoints: summerChampionshipPoints[index],
          championshipPoints:
            summerChampionshipPoints[index] +
            teams.find((team) => team.seed === seed)!.springPoints,
        },
      ];
    }
    if (
      results[5].championshipPoints === results[6].championshipPoints &&
      results[5].summerPoints === results[6].summerPoints
    ) {
      throw Error(
        `Two teams have the same championshipPoints and summerPoints in positions 6 and 7 for scenario ${playoffsResult.scenario}`
      );
    }
    return {
      scenario: playoffsResult.scenario,
      standings: results
        .sort((a, b) => {
          return a.championshipPoints > b.championshipPoints
            ? -1
            : b.championshipPoints > a.championshipPoints
            ? 1
            : a.summerPoints > b.summerPoints
            ? -1
            : b.summerPoints > a.summerPoints
            ? 1
            : 0;
        })
        .map((result) => result.seed),
    };
  });
};
