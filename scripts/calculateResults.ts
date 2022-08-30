import { calculatePlayoffsResults } from "./calculatePlayoffsResults";

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

const summerChampionshipPoints = {
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

type Result = {
  seed: number;
  summerPoints: number;
  championshipPoints: number;
};

export const calculateResults = () => {
  const playoffsResults = calculatePlayoffsResults();
  return playoffsResults.map((playoffsResult) => {
    let results: Result[] = [];
    for (const index in playoffsResult.results) {
      const seed = playoffsResult.results[index];
      results = [
        ...results,
        {
          seed,
          summerPoints: summerChampionshipPoints[index],
          championshipPoints:
            summerChampionshipPoints[index] +
            teams.find((team) => team.seed === seed)?.springPoints,
        },
      ];
    }
    return {
      scenario: playoffsResult.scenario,
      results: results.sort((a, b) => {
        return a.championshipPoints > b.championshipPoints
          ? -1
          : b.championshipPoints > a.championshipPoints
          ? 1
          : a.summerPoints > b.summerPoints
          ? -1
          : b.summerPoints > a.summerPoints
          ? 1
          : 0;
      }),
      playoffsResults: playoffsResult.results,
    };
  });
};
