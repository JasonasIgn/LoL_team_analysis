using Analysis.EF.entities;
using System.Collections.Generic;

namespace Analysis.EF.repositories
{
    public interface IChampionRepository
    {
        List<Champion> UpdateChampions(string api);

        List<Champion> GetAll();
    }
}