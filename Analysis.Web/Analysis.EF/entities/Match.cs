using System;
using System.Collections.Generic;
using System.Text;

namespace Analysis.EF.entities
{
    public class Match
    {
        public int Id { get; set; }
        public string TeamCode { get; set; }
        public int Team1Wins { get; set; }
        public int Team2Wins { get; set; }

    }
}
