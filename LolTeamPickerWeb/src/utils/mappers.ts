export const getMappedDataForChampionSelect = (data: any) => {
  return Object.values(data).map((champion: any) => {
    return {
      id: champion.key,
      title: champion.name,
    };
  });
};
