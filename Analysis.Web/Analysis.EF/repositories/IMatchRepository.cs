using Analysis.EF.entities;
using System.Collections.Generic;

namespace Analysis.EF.repositories
{
    public interface IMatchRepository
    {
        string GetMatchById(long id, string api);
    }
}