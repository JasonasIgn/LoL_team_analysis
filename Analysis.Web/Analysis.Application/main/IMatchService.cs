using Analysis.EF.entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Analysis.Application.main.match
{
    public interface IMatchService
    {
        Match GetMatchById(long id, string api);
    }
}
