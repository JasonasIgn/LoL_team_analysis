using Analysis.EF.entities;
using System.Collections.Generic;

namespace Analysis.EF.repositories
{
    public interface IMatchRepository
    {
        RiotMatch SaveRiotMatchById(long id, string api);
    }
}