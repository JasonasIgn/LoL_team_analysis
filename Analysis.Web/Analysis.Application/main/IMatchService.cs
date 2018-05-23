using System;
using System.Collections.Generic;
using System.Text;

namespace Analysis.Application.main.match
{
    public interface IMatchService
    {
        string GetMatchById(long id, string api);
    }
}
