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
    public class MatchRepository : Repository<RiotMatch>, IMatchRepository
    {
        public MatchRepository(AnalysisContext context) : base(context)
        {

        }

        public AnalysisContext AnalysisContext
        {
            get { return Context as AnalysisContext; }
        }

        public RiotMatch GetMatchById(long id, string api)
        {
            string url = "https://euw1.api.riotgames.com/lol/match/v3/matches/" + id + "?api_key=" + api;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            try
            {
                WebResponse response = request.GetResponse();
                using (Stream responseStream = response.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream, Encoding.UTF8);
                    RiotMatch match = new RiotMatch();
                    int start;
                    match.champ11 = 0;
                    match.champ12 = 0;
                    match.champ13 = 0;
                    match.champ14 = 0;
                    match.champ15 = 0;
                    match.champ21 = 0;
                    match.champ22 = 0;
                    match.champ23 = 0;
                    match.champ24 = 0;
                    match.champ25 = 0;
                    string responseString = reader.ReadToEnd();
                    for (int i = 0; i < 10; i++)
                    {
                        start = responseString.IndexOf("championId");
                        responseString = responseString.Remove(start, 12);
                    }
                        for (int i = 0; i < 10; i++)
                    {
                        start = responseString.IndexOf("championId");
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
                        integ += responseString[start];
                            start++;

                    }

                    start = responseString.IndexOf("win");
                    responseString = responseString.Remove(start, 6);
                    if (responseString[start] == 'W') match.winTeam1 = true;
                    else match.winTeam1 = false;

                    return match;
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
