using Analysis.EF.entities;
using System.Collections.Generic;

namespace Analysis.EF.repositories
{
    public interface IMatchRepository
    {
        int SaveRiotMatchById(long id, string api);
        Match FindMatch(string team1, string team2);
    }
}