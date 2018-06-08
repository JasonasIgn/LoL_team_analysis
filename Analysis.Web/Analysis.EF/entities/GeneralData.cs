using System;
using System.Collections.Generic;
using System.Text;

namespace Analysis.EF.entities
{
    public class GeneralData
    {
        public int Id { get; set; }
        public long CurrentMatchId { get; set; }
        public int TotalTeamCombinations { get; set; }
        public string ApiKey { get; set; }
    }
}

