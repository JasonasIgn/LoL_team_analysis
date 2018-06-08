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
        const int MAXIND = 516;   //maksimalus champion id
        private IChampionRepository _championRepository;
        public MatchRepository(AnalysisContext context, IChampionRepository championRepository) : base(context)
        {
            _championRepository = championRepository;
        }

        public AnalysisContext AnalysisContext
        {
            get { return Context as AnalysisContext; }
        }

        public Match GetMatchByTeamcode(int code)
        {
            return AnalysisContext.Match
                .SingleOrDefault(p => p.Id == code);
        }

        public Match FindMatch(string team1, string team2)
        {
            int teamCode1 = 0;
            int teamCode2 = 0;
            string[] team1arrayStr = new string[5];
            string[] team2arrayStr = new string[5];
            int[] team1array = new int[5];
            int[] team2array = new int[5];
            team1arrayStr = team1.Split('_');
            team2arrayStr = team2.Split('_');
            for (int i = 0; i < 5; i++)
            {
                team1array[i] = Int32.Parse(team1arrayStr[i]);
                team2array[i] = Int32.Parse(team2arrayStr[i]);
            }
            teamCode1 = team1array[0] + team1array[1] + MAXIND * 1 + team1array[2] + MAXIND * 3 + team1array[3] + MAXIND * 7 + team1array[4] + MAXIND * 15 + team2array[0] + MAXIND * 31 + team2array[1] + MAXIND * 63 + team2array[2] + MAXIND * 127 + team2array[3] + MAXIND * 255 + team2array[4] + MAXIND * 511;
            teamCode2 = team2array[0] + team2array[1] + MAXIND * 1 + team2array[2] + MAXIND * 3 + team2array[3] + MAXIND * 7 + team2array[4] + MAXIND * 15 + team1array[0] + MAXIND * 31 + team1array[1] + MAXIND * 63 + team1array[2] + MAXIND * 127 + team1array[3] + MAXIND * 255 + team1array[4] + MAXIND * 511;
            if (AnalysisContext.Match.Any(x => x.Id == teamCode1))
            {
                return AnalysisContext.Match
                    .SingleOrDefault(x => x.Id == teamCode1);
            }
            else
            {
                return AnalysisContext.Match
                    .SingleOrDefault(x => x.Id == teamCode2);
            }
        }

        public int SaveRiotMatchById(long id, string api)
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
                    int mapId;
                    int tolerance = 0;
                    int uniqueCode1 = 0;
                    int uniqueCode2 = 0;
                    int champPos = -1;
                    


                    for (int i = 0; i < 5; i++)
                    {

                        match.team1[i] = 0;
                        match.team2[i] = 0;
                    }
                    string teamCode1 = "";
                    string teamCode2 = "";
                    string suggestion = "";
                    string responseString = reader.ReadToEnd();

                    //GET MAP ID (11 - summoners rift, 12 - ARAM)
                    start = responseString.IndexOf("mapId");

                    responseString = responseString.Remove(start, 7);
                    string integ = "";
                    while (Char.IsNumber(responseString[start]))
                    {
                        integ += responseString[start];
                        start++;
                    }
                    mapId = Int32.Parse(integ);
                    integ = "";
                    if (mapId != 11 && mapId != 1 && mapId != 2) return 3;

                    //CHECK IF ITS RANKED
                    start = responseString.IndexOf("queueId");
                    responseString = responseString.Remove(start, 9);
                    while (Char.IsNumber(responseString[start]))
                    {
                        integ += responseString[start];
                        start++;
                    }
                    if (Int32.Parse(integ) != 420) return 2;

                    integ = "";
                    //CHECK PLAYER RANKS (accept gold and above)
                    while (responseString.IndexOf("UNRANKED") != -1)
                    {
                        if (tolerance > 3) break;
                        start = responseString.IndexOf("UNRANKED");
                        responseString = responseString.Remove(start, 8);
                        tolerance++;
                            
                    }
                    if (tolerance < 4)
                    {
                        while (responseString.IndexOf("BRONZE") != -1)
                        {
                            if (tolerance > 3) break;
                            start = responseString.IndexOf("BRONZE");
                            responseString = responseString.Remove(start, 6);
                            tolerance++;

                        }
                    }
                    if (tolerance < 4)
                    {
                        while (responseString.IndexOf("SILVER") != -1)
                        {
                            if (tolerance > 3) break;
                            start = responseString.IndexOf("SILVER");
                            responseString = responseString.Remove(start, 6);
                            tolerance++;

                        }
                    }
                    if (tolerance > 3) return 4;

                    //ISMETAMI BANNINTI CHAMPAI
                    for (int i = 0; i < 10; i++)
                    {
                        start = responseString.IndexOf("championId");
                        responseString = responseString.Remove(start, 12);
                    }

                    //GAUNAMI PICKINTI CHAMPAI
                    for (int i = 0; i < 10; i++)
                    {
                        start = responseString.IndexOf("role");
                        if (responseString[start + 7] == 'N' && responseString[start + 21] == 'J')
                        {
                            champPos = 1;
                            responseString = responseString.Remove(start, 28);
                        }
                        else if (responseString[start + 7] == 'S' && responseString[start + 21] == 'M')
                        {
                            champPos = 2;
                            responseString = responseString.Remove(start, 28);
                        }
                        else if (responseString[start + 11] == 'S' && responseString[start + 28] == 'B')
                        {
                            champPos = 4;
                            responseString = responseString.Remove(start, 34);
                        }
                        else if (responseString[start + 11] == 'C' && responseString[start + 26] == 'B')
                        {
                            champPos = 3;
                            responseString = responseString.Remove(start, 34);
                        }
                        else if (responseString[start + 7] == 'S' && responseString[start + 21] == 'T')
                        {
                            champPos = 0;
                            responseString = responseString.Remove(start, 28);
                        }

                        //ERROR WHILE GETTING POSITIONS
                        if (i > 4 && match.team2[champPos] != 0 || i <= 4 && match.team1[champPos] != 0) return 5;

                        start = responseString.IndexOf("championId");
                        responseString = responseString.Remove(start, 12);
                        integ = "";
                        while (Char.IsNumber(responseString[start]))
                        {
                            integ += responseString[start];
                            start++;
                        }
                        if (i < 5) match.team1[champPos] = Int32.Parse(integ);
                        else match.team2[champPos] = Int32.Parse(integ);
                    }

                    //MORE ERROR EXCEPTIONS WHILE GETTING CHAMPS POSITIONS
                    if (match.team1.Contains(0) || match.team2.Contains(0)) return 5;

                    //WHICH TEAM WON
                    start = responseString.IndexOf("win");
                    responseString = responseString.Remove(start, 6);
                    if (responseString[start] == 'W') match.winTeam1 = true;
                    else match.winTeam1 = false;

                    for (int i0 = 0; i0 <= match.team1[0]; i0 += match.team1[0])
                    {
                        for (int i1 = 0; i1 <= match.team1[1]; i1 += match.team1[1])
                        {
                            for (int i2 = 0; i2 <= match.team1[2]; i2 += match.team1[2])
                            {
                                for (int i3 = 0; i3 <= match.team1[3]; i3 += match.team1[3])
                                {
                                    for (int i4 = 0; i4 <= match.team1[4]; i4 += match.team1[4])
                                    {
                                        for (int i5 = 0; i5 <= match.team2[0]; i5 += match.team2[0])
                                        {
                                            for (int i6 = 0; i6 <= match.team2[1]; i6 += match.team2[1])
                                            {
                                                for (int i7 = 0; i7 <= match.team2[2]; i7 += match.team2[2])
                                                {
                                                    for (int i8 = 0; i8 <= match.team2[3]; i8 += match.team2[3])
                                                    {
                                                        for (int i9 = 0; i9 <= match.team2[4]; i9 += match.team2[4])
                                                        {
                                                            uniqueCode1 = 0;
                                                            uniqueCode2 = 0;
                                                            if (i0 != 0)
                                                            {
                                                                uniqueCode1 += i0;
                                                                uniqueCode2 += i0 + MAXIND * 31;
                                                            }
                                                            if (i1 != 0)
                                                            {
                                                                uniqueCode1 += i1 + MAXIND * 1;
                                                                uniqueCode2 += i1 + MAXIND * 63;
                                                            }
                                                            if (i2 != 0)
                                                            {
                                                                uniqueCode1 += i2 + MAXIND * 3;
                                                                uniqueCode2 += i2 + MAXIND * 127;
                                                            }
                                                            if (i3 != 0)
                                                            {
                                                                uniqueCode1 += i3 + MAXIND * 7;
                                                                uniqueCode2 += i3 + MAXIND * 255;
                                                            }
                                                            if (i4 != 0)
                                                            {
                                                                uniqueCode1 += i4 + MAXIND * 15;
                                                                uniqueCode2 += i4 + MAXIND * 511;
                                                            }
                                                            if (i5 != 0)
                                                            {
                                                                uniqueCode1 += i5 + MAXIND * 31;
                                                                uniqueCode2 += i5;
                                                            }
                                                            if (i6 != 0)
                                                            {
                                                                uniqueCode1 += i6 + MAXIND * 63;
                                                                uniqueCode2 += i6 + MAXIND * 1;
                                                            }
                                                            if (i7 != 0)
                                                            {
                                                                uniqueCode1 += i7 + MAXIND * 127;
                                                                uniqueCode2 += i7 + MAXIND * 3;
                                                            }
                                                            if (i8 != 0)
                                                            {
                                                                uniqueCode1 += i8 + MAXIND * 255;
                                                                uniqueCode2 += i8 + MAXIND * 7;
                                                            }
                                                            if (i9 != 0)
                                                            {
                                                                uniqueCode1 += i9 + MAXIND * 511;
                                                                uniqueCode2 += i9 + MAXIND * 15;
                                                            }
                                                            
                                                            if (uniqueCode1 != 0)
                                                            {
                                                                if (AnalysisContext.Match.Any(x => x.Id == uniqueCode1))
                                                                {
                                                                    Match newMatch = GetMatchByTeamcode(uniqueCode1);
                                                                    if (match.winTeam1 == true) newMatch.Team1Wins++;
                                                                    else newMatch.Team2Wins++;
                                                                    AnalysisContext.Update(newMatch);
                                                                    
                                                                }
                                                                else if (AnalysisContext.Match.Any(x => x.Id == uniqueCode2))
                                                                {
                                                                    Match newMatch = GetMatchByTeamcode(uniqueCode2);
                                                                    if (match.winTeam1 == true) newMatch.Team2Wins++;
                                                                    else newMatch.Team1Wins++;
                                                                    AnalysisContext.Update(newMatch);
                                                                    
                                                                }
                                                                else
                                                                {
                                                                    Match newMatch = new Match();
                                                                    newMatch.Id = uniqueCode1;
                                                                    if (match.winTeam1 == true) newMatch.Team1Wins = 1;
                                                                    else newMatch.Team2Wins = 1;
                                                                    
                                                                    AnalysisContext.Add(newMatch);
                                                                    
                                                                }
                                                            }

                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    AnalysisContext.SaveChanges();
                    return 0;






                    

                    
                }
            }
            catch (WebException ex)
            {
                WebResponse errorResponse = ex.Response;
                if (ex.Message.IndexOf("404") != -1) return 404;
                else return 500;
            }
        }


    }
}
