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
                    for (int i = 0; i < 5; i++)
                    {
                        match.team1[i] = 0;
                        match.team2[i] = 0;
                    }
                    string teamCode1 = "";
                    string teamCode2 = "";
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
                        if (i < 5) match.team1[i] = Int32.Parse(integ);
                        else match.team2[i - 5] = Int32.Parse(integ);
                        integ += responseString[start];
                        start++;
                    }
                    Array.Sort(match.team1);
                    Array.Sort(match.team2);
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
