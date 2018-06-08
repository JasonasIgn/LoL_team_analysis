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
        public string Suggestion0 { get; set; }
        public string Suggestion1 { get; set; }
        public string Suggestion2 { get; set; }
        public string Suggestion3 { get; set; }
        public string Suggestion4 { get; set; }
        public string Suggestion5 { get; set; }
        public string Suggestion6 { get; set; }
        public string Suggestion7 { get; set; }
        public string Suggestion8 { get; set; }
        public string Suggestion9 { get; set; }

    }
}
