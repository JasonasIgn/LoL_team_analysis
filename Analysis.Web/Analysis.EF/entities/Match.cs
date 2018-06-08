using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Analysis.EF.entities
{
    public class Match
    {
        public int Id { get; set; }
        //[Key]
       // public string TeamCode { get; set; }
        public Int16 Team1Wins { get; set; }
        public Int16 Team2Wins { get; set; }

    }
}
