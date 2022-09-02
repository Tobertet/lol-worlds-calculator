import { ReducedScenario } from "./types";

const canBeUnited = (
  scenario1: ReducedScenario,
  scenario2: ReducedScenario,
  dimension: number
) => {
  if (
    scenario1[dimension] === scenario2[dimension] ||
    scenario1[dimension] === undefined ||
    scenario2[dimension] === undefined
  ) {
    return false;
  }
  for (const index of Object.keys(scenario1)) {
    if (
      parseInt(index) !== dimension &&
      scenario1[index] !== scenario2[index]
    ) {
      return false;
    }
  }
  for (const index of Object.keys(scenario2)) {
    if (
      parseInt(index) !== dimension &&
      scenario1[index] !== scenario2[index]
    ) {
      return false;
    }
  }
  return true;
};

const union = (
  scenario1: ReducedScenario,
  scenario2: ReducedScenario,
  dimension: number
) => {
  if (!canBeUnited(scenario1, scenario2, dimension)) {
    throw Error("Tried to unite 2 scenarios that cannot be united");
  }
  let union: ReducedScenario = {};
  for (const index of Object.keys(scenario1)) {
    if (parseInt(index) !== dimension) {
      union = { ...union, [index]: scenario1[index] };
    }
  }
  return union;
};

const groupScenarios = (
  scenarios: ReducedScenario[],
  size: number,
  dimensions: number
) => {
  let groupedScenarios: ReducedScenario[] = [];
  let ungroupedScenarios = scenarios.filter(
    (scenario) => Object.keys(scenario).length !== size + 1
  );
  let scenariosToGroup = scenarios.filter(
    (scenario) => Object.keys(scenario).length === size + 1
  );

  for (let dimension = dimensions; dimension > 0; dimension--) {
    let processedIndexes = new Set<number>();
    for (let i = 0; i < scenariosToGroup.length; i++) {
      if (processedIndexes.has(i)) {
        continue;
      }
      for (let j = i + 1; j < scenariosToGroup.length; j++) {
        if (processedIndexes.has(j)) {
          continue;
        }
        if (canBeUnited(scenariosToGroup[i], scenariosToGroup[j], dimension)) {
          groupedScenarios = [
            ...groupedScenarios,
            union(scenariosToGroup[i], scenariosToGroup[j], dimension),
          ];
          processedIndexes.add(i);
          processedIndexes.add(j);
        }
      }
    }
    scenariosToGroup = scenariosToGroup.filter(
      (value, index) => !processedIndexes.has(index)
    );
  }

  return [...groupedScenarios, ...ungroupedScenarios, ...scenariosToGroup];
};

export const minimizeScenarios = (
  scenarios: ReducedScenario[],
  dimensions: number
) => {
  console.log(`Minimizing ${scenarios.length} complete scenarios...`);
  let minimizedScenarios = [...scenarios];
  const amountOfScenariosBySize: { [size: number]: number } = {};
  for (let size = dimensions - 1; size > 0; size--) {
    amountOfScenariosBySize[size + 1] = 0;
    minimizedScenarios = [
      ...groupScenarios(minimizedScenarios, size, dimensions),
    ];
  }
  for (const scenario of minimizedScenarios) {
    amountOfScenariosBySize[Object.keys(scenario).length]++;
  }
  let totalScenariosAfterMinimizing = 0;
  for (const size of Object.keys(amountOfScenariosBySize)) {
    console.log(
      `Scenarios of size ${Math.pow(2, dimensions - parseInt(size))} : ${
        amountOfScenariosBySize[size]
      }`
    );
    totalScenariosAfterMinimizing +=
      Math.pow(2, dimensions - parseInt(size)) * amountOfScenariosBySize[size];
  }
  console.log(
    `Total complete scenarios after minimizing: ${totalScenariosAfterMinimizing}.`
  );
  console.log(
    `Total scenarios after minimizing: ${minimizedScenarios.length}.`
  );

  if (totalScenariosAfterMinimizing !== scenarios.length) {
    console.error("ERROR: There was a loss of scenarios!");
  }

  return minimizedScenarios;
};
