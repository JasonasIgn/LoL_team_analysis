using Analysis.EF.entities;
using System.Collections.Generic;

namespace Analysis.EF.repositories
{
    public interface IMatchRepository
    {
        Match GetMatchById(long id, string api);
    }
}