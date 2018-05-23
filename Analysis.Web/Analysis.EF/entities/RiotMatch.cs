using System;
using System.Collections.Generic;
using System.Text;

namespace Analysis.EF.entities
{
    public class RiotMatch
    {

        public int[] team1 = new int[5];

        public int[] team2 = new int[5];
        public bool winTeam1 { get; set; }

    }
}
