using Analysis.EF.entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace Analysis.EF.repositories
{
    public class MatchRepository : Repository<Match>, IMatchRepository
    {
        public MatchRepository(AnalysisContext context) : base(context)
        {

        }

        public AnalysisContext AnalysisContext
        {
            get { return Context as AnalysisContext; }
        }

        public Match GetMatchById(long id, string api)
        {
            string url = "https://euw1.api.riotgames.com/lol/match/v3/matches/" + id + "?api_key=" + api;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            try
            {
                WebResponse response = request.GetResponse();
                using (Stream responseStream = response.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream, Encoding.UTF8);
                    Match match = new Match();
                    match.champ11 = 10;
                    match.champ12 = 10;
                    match.champ13 = 10;
                    match.champ14 = 10;
                    match.champ15 = 10;
                    match.champ21 = 10;
                    match.champ22 = 10;
                    match.champ23 = 10;
                    match.champ24 = 10;
                    match.champ25 = 10;
                    string responseString = reader.ReadToEnd();
                    for (int i = 0; i < 10; i++)
                    {
                        int start = responseString.IndexOf("championId");
                        responseString = responseString.Remove(start, 12);
                        string integ = "";
                        while (Char.IsNumber(responseString[start]))
                        {
                            integ += responseString[start];
                            start++;
                        }
                        if (i == 0) match.champ11 = Int32.Parse(integ);
                        else if (i == 1) match.champ12 = Int32.Parse(integ);
                        else if (i == 2) match.champ13 = Int32.Parse(integ);
                        else if (i == 3) match.champ14 = Int32.Parse(integ);
                        else if (i == 4) match.champ15 = Int32.Parse(integ);
                        else if (i == 5) match.champ21 = Int32.Parse(integ);
                        else if (i == 6) match.champ22 = Int32.Parse(integ);
                        else if (i == 7) match.champ23 = Int32.Parse(integ);
                        else if (i == 8) match.champ24 = Int32.Parse(integ);
                        else if (i == 9) match.champ25 = Int32.Parse(integ);
                        else { }


                    }
                    
                    return match;
                    //return reader.ReadToEnd();
                }
            }
            catch (WebException ex)
            {
                WebResponse errorResponse = ex.Response;
                using (Stream responseStream = errorResponse.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream, Encoding.GetEncoding("utf-8"));
                    String errorText = reader.ReadToEnd();
                }
                throw;
            }
        }


    }
}
