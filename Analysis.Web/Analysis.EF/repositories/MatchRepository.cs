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

       // public Match
        public Match SaveRiotMatchById(long id, string api)
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
                    teamCode1 += match.team1[0];
                    teamCode2 += match.team2[0];
                    for (int i = 1; i < 5; i++)
                    {
                        teamCode1 += "_" + match.team1[i];
                        teamCode2 += "_" + match.team2[i];
                    }
                    teamCode1 += "-";
                    teamCode2 += "-";

                    teamCode2 += match.team1[0];
                    teamCode1 += match.team2[0];
                    for (int i = 1; i < 5; i++)
                    {
                        teamCode2 += "_" + match.team1[i];
                        teamCode1 += "_" + match.team2[i];
                    }

                    start = responseString.IndexOf("win");
                    responseString = responseString.Remove(start, 6);
                    if (responseString[start] == 'W') match.winTeam1 = true;
                    else match.winTeam1 = false;

                    if (AnalysisContext.Match.Any(x => x.TeamCode == teamCode1))
                    {

                    }
                    else if (AnalysisContext.Match.Any(x => x.TeamCode == teamCode2))
                    {

                    }
                    else
                    {
                        Match newMatch = new Match();
                        newMatch.TeamCode = teamCode1;
                        if (match.winTeam1 == true) newMatch.Team1Wins = 1;
                        else newMatch.Team2Wins = 1;
                        AnalysisContext.Add(newMatch);
                        AnalysisContext.SaveChanges();
                        return newMatch;
                    }
                    

                    return null;
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
