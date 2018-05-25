using Analysis.EF.entities;
using System.Collections.Generic;

namespace Analysis.Application.main.champion
{
    public interface IChampionService
    {
        List<Champion> UpdateChampions(string api);
        List<Champion> GetAll();
    }
}