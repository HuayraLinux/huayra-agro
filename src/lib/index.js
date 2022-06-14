const uniq = values =>[...new Set(values)];

const getCycleNames = allResources => allResources.map(r => r.ciclo);
const getResourcesByCycleName = (allResources, cycleName) => allResources.filter(r => r.ciclo === cycleName);
const getCategoryNames = (allResources) => allResources.map(r => r.categoria);
const getResourcesByCategoryName = (allResources, categoryName) => allResources.filter(r => r.categoria === categoryName);

const getData = (resources) => {
  const cycles = uniq(getCycleNames(resources));

  const grouped = cycles.map((cycleName) => {
    const resourcesByCycle = getResourcesByCycleName(resources, cycleName);
    const categoriesUnderCycle = uniq(getCategoryNames(resourcesByCycle));

    const resourcesByCategoryUnderCycle = categoriesUnderCycle.map((categoryName, i) =>
      (
        {
          id: i + 1,
          category: categoryName,
          resources: getResourcesByCategoryName(resourcesByCycle, categoryName)
        }
      )
    );

    return ({ cycle: cycleName, categories: resourcesByCategoryUnderCycle });
  }, {});

  return grouped;
};

export default getData;
