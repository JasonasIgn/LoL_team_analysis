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
        const int MAXIND = 555;   //maksimalus champion id
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
            if (team1array[0] != 0)
            {
                teamCode1 += team1array[0];
                teamCode2 += team1array[0] + MAXIND * 31;
            }
            if (team1array[1] != 0)
            {
                teamCode1 += team1array[1] + MAXIND * 1;
                teamCode2 += team1array[1] + MAXIND * 63;
            }
            if (team1array[2] != 0)
            {
                teamCode1 += team1array[2] + MAXIND * 3;
                teamCode2 += team1array[2] + MAXIND * 127;
            }
            if (team1array[3] != 0)
            {
                teamCode1 += team1array[3] + MAXIND * 7;
                teamCode2 += team1array[3] + MAXIND * 255;
            }
            if (team1array[4] != 0)
            {
                teamCode1 += team1array[4] + MAXIND * 15;
                teamCode2 += team1array[4] + MAXIND * 511;
            }
            if (team2array[0] != 0)
            {
                teamCode1 += team2array[0] + MAXIND * 31;
                teamCode2 += team2array[0];
            }
            if (team2array[1] != 0)
            {
                teamCode1 += team2array[1] + MAXIND * 63;
                teamCode2 += team2array[1] + MAXIND * 1;
            }
            if (team2array[2] != 0)
            {
                teamCode1 += team2array[2] + MAXIND * 127;
                teamCode2 += team2array[2] + MAXIND * 3;
            }
            if (team2array[3] != 0)
            {
                teamCode1 += team2array[3] + MAXIND * 255;
                teamCode2 += team2array[3] + MAXIND * 7;
            }
            if (team2array[4] != 0)
            {
                teamCode1 += team2array[4] + MAXIND * 511;
                teamCode2 += team2array[4] + MAXIND * 15;
            }
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
                    int integINT = 0;
                    int tempInt = 0;


                    for (int i = 0; i < 5; i++)
                    {

                        match.team1[i] = 0;
                        match.team2[i] = 0;
                    }
                    string teamCode1 = "";
                    string teamCode2 = "";
                    string suggestion = "";
                    string temp = "";
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
                        if (champPos == -1 || i > 4 && match.team2[champPos] != 0 || i <= 4 && match.team1[champPos] != 0) return 5;

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
                                                                    newMatch = UpdateMatch(match.winTeam1, newMatch, match, i0, i1, i2, i3, i4, i5, i6, i7, i8, i9);
                                                                    AnalysisContext.Update(newMatch);
                                                                    
                                                                }
                                                                else if (AnalysisContext.Match.Any(x => x.Id == uniqueCode2))
                                                                {
                                                                    Match newMatch = GetMatchByTeamcode(uniqueCode2);
                                                                    for (int i = 0; i < 5; i++)
                                                                    {
                                                                        tempInt = match.team1[i];
                                                                        match.team1[i] = match.team2[i];
                                                                        match.team2[i] = tempInt;
                                                                    }
                                                                    
                                                                    newMatch = UpdateMatch(!match.winTeam1, newMatch, match, i5, i6, i7, i8, i9, i0, i1, i2, i3, i4);
                                                                    for (int i = 0; i < 5; i++)
                                                                    {
                                                                        tempInt = match.team1[i];
                                                                        match.team1[i] = match.team2[i];
                                                                        match.team2[i] = tempInt;
                                                                    }
                                                                    AnalysisContext.Update(newMatch);
                                                                    
                                                                }
                                                                else
                                                                {
                                                                    Match newMatch = new Match();
                                                                    newMatch.Id = uniqueCode1;
                                                                    if (match.winTeam1 == true)
                                                                    {
                                                                        newMatch.Team1Wins = 1;
                                                                        if (i0 == 0) newMatch.Suggestion0 = match.team1[0] + "(1,0)";
                                                                        if (i1 == 0) newMatch.Suggestion1 = match.team1[1] + "(1,0)";
                                                                        if (i2 == 0) newMatch.Suggestion2 = match.team1[2] + "(1,0)";
                                                                        if (i3 == 0) newMatch.Suggestion3 = match.team1[3] + "(1,0)";
                                                                        if (i4 == 0) newMatch.Suggestion4 = match.team1[4] + "(1,0)";
                                                                        if (i5 == 0) newMatch.Suggestion5 = match.team2[0] + "(0,1)";
                                                                        if (i6 == 0) newMatch.Suggestion6 = match.team2[1] + "(0,1)";
                                                                        if (i7 == 0) newMatch.Suggestion7 = match.team2[2] + "(0,1)";
                                                                        if (i8 == 0) newMatch.Suggestion8 = match.team2[3] + "(0,1)";
                                                                        if (i9 == 0) newMatch.Suggestion9 = match.team2[4] + "(0,1)";
                                                                    }
                                                                    else
                                                                    {
                                                                        newMatch.Team2Wins = 1;
                                                                        if (i0 == 0) newMatch.Suggestion0 = match.team1[0] + "(0,1)";
                                                                        if (i1 == 0) newMatch.Suggestion1 = match.team1[1] + "(0,1)";
                                                                        if (i2 == 0) newMatch.Suggestion2 = match.team1[2] + "(0,1)";
                                                                        if (i3 == 0) newMatch.Suggestion3 = match.team1[3] + "(0,1)";
                                                                        if (i4 == 0) newMatch.Suggestion4 = match.team1[4] + "(0,1)";
                                                                        if (i5 == 0) newMatch.Suggestion5 = match.team2[0] + "(1,0)";
                                                                        if (i6 == 0) newMatch.Suggestion6 = match.team2[1] + "(1,0)";
                                                                        if (i7 == 0) newMatch.Suggestion7 = match.team2[2] + "(1,0)";
                                                                        if (i8 == 0) newMatch.Suggestion8 = match.team2[3] + "(1,0)";
                                                                        if (i9 == 0) newMatch.Suggestion9 = match.team2[4] + "(1,0)";
                                                                    }
                                                                    
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

        public Match UpdateMatch(bool firstTeamWon, Match newMatch, RiotMatch match, int i0, int i1, int i2, int i3,
            int i4, int i5, int i6, int i7, int i8, int i9)
        {
            string integ2 = "";
            bool isOther = false;
            string temp = "", integ = "";
            int start = 0, integINT = 0, integ2INT = 0;
            if (firstTeamWon) newMatch.Team1Wins++;
            else newMatch.Team2Wins++;   //////////
            if (i0 == 0 && newMatch.Suggestion0 != null)
            {
                temp = match.team1[0].ToString() + "(";
                if (newMatch.Suggestion0.IndexOf(temp) == -1)
                {
                    if (firstTeamWon) newMatch.Suggestion0 += match.team1[0] + "(1,0)";
                    else newMatch.Suggestion0 += match.team1[0] + "(0,1)";

                }
                else
                {
                    if (firstTeamWon)
                    {
                        start = newMatch.Suggestion0.IndexOf(match.team1[0] + "(");
                        start += match.team1[0].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        while (Char.IsNumber(newMatch.Suggestion0[start]))
                        {
                            integ += newMatch.Suggestion0[start];
                            start++;
                        }
                        integINT = Int32.Parse(integ) + 1;
                        newMatch.Suggestion0 = newMatch.Suggestion0.Replace(match.team1[0] + "(" + integ, match.team1[0] + "(" + integINT);
                    }
                    else
                    {
                        start = newMatch.Suggestion0.IndexOf(match.team1[0] + "(");
                        start += match.team1[0].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        integ2 = "";
                        isOther = false;
                        while (Char.IsNumber(newMatch.Suggestion0[start]))
                        {
                            
                            if (!isOther) integ += newMatch.Suggestion0[start];
                            if (isOther) integ2 += newMatch.Suggestion0[start];
                            start++;
                            if (newMatch.Suggestion0[start] == ',')
                            {
                                start++;
                                isOther = true;
                            }
                        }
                        //integINT = Int32.Parse(integ);
                        integ2INT = Int32.Parse(integ2) + 1;    //Pralaimejimu skaicius
                        newMatch.Suggestion0 = newMatch.Suggestion0.Replace(match.team1[0] + "(" + integ + "," + integ2 + ")", match.team1[0] + "(" + integ + "," + integ2INT + ")");
                    }
                }
            }
            else if (i0 == 0 && newMatch.Suggestion0 == null)
            {
                if (firstTeamWon) newMatch.Suggestion0 = match.team1[0] + "(1,0)";
                else newMatch.Suggestion0 = match.team1[0] + "(0,1)";

            }

            if (i1 == 0 && newMatch.Suggestion1 != null)
            {
                temp = match.team1[1].ToString() + "(";
                if (newMatch.Suggestion1.IndexOf(temp) == -1)
                {
                    if (firstTeamWon) newMatch.Suggestion1 += match.team1[1] + "(1,0)";
                    else newMatch.Suggestion1 += match.team1[1] + "(0,1)";

                }
                else
                {
                    if (firstTeamWon)
                    {
                        start = newMatch.Suggestion1.IndexOf(match.team1[1] + "(");
                        start += match.team1[1].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        while (Char.IsNumber(newMatch.Suggestion1[start]))
                        {
                            integ += newMatch.Suggestion1[start];
                            start++;
                        }
                        integINT = Int32.Parse(integ) + 1;
                        newMatch.Suggestion1 = newMatch.Suggestion1.Replace(match.team1[1] + "(" + integ, match.team1[1] + "(" + integINT);
                    }
                    else
                    {
                        start = newMatch.Suggestion1.IndexOf(match.team1[1] + "(");
                        start += match.team1[1].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        integ2 = "";
                        isOther = false;
                        while (Char.IsNumber(newMatch.Suggestion1[start]))
                        {
                            
                            if (!isOther) integ += newMatch.Suggestion1[start];
                            if (isOther) integ2 += newMatch.Suggestion1[start];
                            start++;
                            if (newMatch.Suggestion1[start] == ',')
                            {
                                start++;
                                isOther = true;
                            }
                        }
                        //integINT = Int32.Parse(integ);
                        integ2INT = Int32.Parse(integ2) + 1;    //Pralaimejimu skaicius
                        newMatch.Suggestion1 = newMatch.Suggestion1.Replace(match.team1[1] + "(" + integ + "," + integ2 + ")", match.team1[1] + "(" + integ + "," + integ2INT + ")");
                    }
                }
            }
            else if (i1 == 0 && newMatch.Suggestion1 == null)
            {
                if (firstTeamWon) newMatch.Suggestion1 = match.team1[1] + "(1,0)";
                else newMatch.Suggestion1 = match.team1[1] + "(0,1)";

            }
            if (i2 == 0 && newMatch.Suggestion2 != null)
            {
                temp = match.team1[2].ToString() + "(";
                if (newMatch.Suggestion2.IndexOf(temp) == -1)
                {
                    if (firstTeamWon) newMatch.Suggestion2 += match.team1[2] + "(1,0)";
                    else newMatch.Suggestion2 += match.team1[2] + "(0,1)";

                }
                else
                {
                    if (firstTeamWon)
                    {
                        start = newMatch.Suggestion2.IndexOf(match.team1[2] + "(");
                        start += match.team1[2].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        while (Char.IsNumber(newMatch.Suggestion2[start]))
                        {
                            integ += newMatch.Suggestion2[start];
                            start++;
                        }
                        integINT = Int32.Parse(integ) + 1;
                        newMatch.Suggestion2 = newMatch.Suggestion2.Replace(match.team1[2] + "(" + integ, match.team1[2] + "(" + integINT);
                    }
                    else
                    {
                        start = newMatch.Suggestion2.IndexOf(match.team1[2] + "(");
                        start += match.team1[2].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        integ2 = "";
                        isOther = false;
                        while (Char.IsNumber(newMatch.Suggestion2[start]))
                        {
                            
                            if (!isOther) integ += newMatch.Suggestion2[start];
                            if (isOther) integ2 += newMatch.Suggestion2[start];
                            start++;
                            if (newMatch.Suggestion2[start] == ',')
                            {
                                start++;
                                isOther = true;
                            }
                        }
                        //integINT = Int32.Parse(integ);
                        integ2INT = Int32.Parse(integ2) + 1;    //Pralaimejimu skaicius
                        newMatch.Suggestion2 = newMatch.Suggestion2.Replace(match.team1[2] + "(" + integ + "," + integ2 + ")", match.team1[2] + "(" + integ + "," + integ2INT + ")");
                    }
                }
            }
            else if (i2 == 0 && newMatch.Suggestion2 == null)
            {
                if (firstTeamWon) newMatch.Suggestion2 = match.team1[2] + "(1,0)";
                else newMatch.Suggestion2 = match.team1[2] + "(0,1)";

            }
            if (i3 == 0 && newMatch.Suggestion3 != null)
            {
                temp = match.team1[3].ToString() + "(";
                if (newMatch.Suggestion3.IndexOf(temp) == -1)
                {
                    if (firstTeamWon) newMatch.Suggestion3 += match.team1[3] + "(1,0)";
                    else newMatch.Suggestion3 += match.team1[3] + "(0,1)";

                }
                else
                {
                    if (firstTeamWon)
                    {
                        start = newMatch.Suggestion3.IndexOf(match.team1[3] + "(");
                        start += match.team1[3].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        while (Char.IsNumber(newMatch.Suggestion3[start]))
                        {
                            integ += newMatch.Suggestion3[start];
                            start++;
                        }
                        integINT = Int32.Parse(integ) + 1;
                        newMatch.Suggestion3 = newMatch.Suggestion3.Replace(match.team1[3] + "(" + integ, match.team1[3] + "(" + integINT);
                    }
                    else
                    {
                        start = newMatch.Suggestion3.IndexOf(match.team1[3] + "(");
                        start += match.team1[3].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        integ2 = "";
                        isOther = false;
                        while (Char.IsNumber(newMatch.Suggestion3[start]))
                        {
                            
                            if (!isOther) integ += newMatch.Suggestion3[start];
                            if (isOther) integ2 += newMatch.Suggestion3[start];
                            start++;
                            if (newMatch.Suggestion3[start] == ',')
                            {
                                start++;
                                isOther = true;
                            }
                        }
                        //integINT = Int32.Parse(integ);
                        integ2INT = Int32.Parse(integ2) + 1;    //Pralaimejimu skaicius
                        newMatch.Suggestion3 = newMatch.Suggestion3.Replace(match.team1[3] + "(" + integ + "," + integ2 + ")", match.team1[3] + "(" + integ + "," + integ2INT + ")");
                    }
                }
            }
            else if (i3 == 0 && newMatch.Suggestion3 == null)
            {
                if (firstTeamWon) newMatch.Suggestion3 = match.team1[3] + "(1,0)";
                else newMatch.Suggestion3 = match.team1[3] + "(0,1)";

            }
            if (i4 == 0 && newMatch.Suggestion4 != null)
            {
                temp = match.team1[4].ToString() + "(";
                if (newMatch.Suggestion4.IndexOf(temp) == -1)
                {
                    if (firstTeamWon) newMatch.Suggestion4 += match.team1[4] + "(1,0)";
                    else newMatch.Suggestion4 += match.team1[4] + "(0,1)";

                }
                else
                {
                    if (firstTeamWon)
                    {
                        start = newMatch.Suggestion4.IndexOf(match.team1[4] + "(");
                        start += match.team1[4].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        while (Char.IsNumber(newMatch.Suggestion4[start]))
                        {
                            integ += newMatch.Suggestion4[start];
                            start++;
                        }
                        integINT = Int32.Parse(integ) + 1;
                        newMatch.Suggestion4 = newMatch.Suggestion4.Replace(match.team1[4] + "(" + integ, match.team1[4] + "(" + integINT);
                    }
                    else
                    {
                        start = newMatch.Suggestion4.IndexOf(match.team1[4] + "(");
                        start += match.team1[4].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        integ2 = "";
                        isOther = false;
                        while (Char.IsNumber(newMatch.Suggestion4[start]))
                        {
                            
                            if (!isOther) integ += newMatch.Suggestion4[start];
                            if (isOther) integ2 += newMatch.Suggestion4[start];
                            start++;
                            if (newMatch.Suggestion4[start] == ',')
                            {
                                start++;
                                isOther = true;
                            }
                        }
                        //integINT = Int32.Parse(integ);
                        integ2INT = Int32.Parse(integ2) + 1;    //Pralaimejimu skaicius
                        newMatch.Suggestion4 = newMatch.Suggestion4.Replace(match.team1[4] + "(" + integ + "," + integ2 + ")", match.team1[4] + "(" + integ + "," + integ2INT + ")");
                    }
                }
            }
            else if (i4 == 0 && newMatch.Suggestion4 == null)
            {
                if (firstTeamWon) newMatch.Suggestion4 = match.team1[4] + "(1,0)";
                else newMatch.Suggestion4 = match.team1[4] + "(0,1)";

            }
            if (i5 == 0 && newMatch.Suggestion5 != null)
            {
                temp = match.team2[0].ToString() + "(";
                if (newMatch.Suggestion5.IndexOf(temp) == -1)
                {
                    if (!firstTeamWon) newMatch.Suggestion5 += match.team2[0] + "(1,0)";
                    else newMatch.Suggestion5 += match.team2[0] + "(0,1)";

                }
                else
                {
                    if (!firstTeamWon)
                    {
                        start = newMatch.Suggestion5.IndexOf(match.team2[0] + "(");
                        start += match.team2[0].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        while (Char.IsNumber(newMatch.Suggestion5[start]))
                        {
                            integ += newMatch.Suggestion5[start];
                            start++;
                        }
                        integINT = Int32.Parse(integ) + 1;
                        newMatch.Suggestion5 = newMatch.Suggestion5.Replace(match.team2[0] + "(" + integ, match.team2[0] + "(" + integINT);
                    }
                    else
                    {
                        start = newMatch.Suggestion5.IndexOf(match.team2[0] + "(");
                        start += match.team2[0].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        integ2 = "";
                        isOther = false;
                        while (Char.IsNumber(newMatch.Suggestion5[start]))
                        {
                            
                            if (!isOther) integ += newMatch.Suggestion5[start];
                            if (isOther) integ2 += newMatch.Suggestion5[start];
                            start++;
                            if (newMatch.Suggestion5[start] == ',')
                            {
                                start++;
                                isOther = true;
                            }
                        }
                        //integINT = Int32.Parse(integ);
                        integ2INT = Int32.Parse(integ2) + 1;    //Pralaimejimu skaicius
                        newMatch.Suggestion5 = newMatch.Suggestion5.Replace(match.team2[0] + "(" + integ + "," + integ2 + ")", match.team2[0] + "(" + integ + "," + integ2INT + ")");
                    }
                }
            }
            else if (i5 == 0 && newMatch.Suggestion5 == null)
            {
                if (!firstTeamWon) newMatch.Suggestion5 = match.team2[0] + "(1,0)";
                else newMatch.Suggestion5 = match.team2[0] + "(0,1)";

            }

            if (i6 == 0 && newMatch.Suggestion6 != null)
            {
                temp = match.team2[1].ToString() + "(";
                if (newMatch.Suggestion6.IndexOf(temp) == -1)
                {
                    if (!firstTeamWon) newMatch.Suggestion6 += match.team2[1] + "(1,0)";
                    else newMatch.Suggestion6 += match.team2[1] + "(0,1)";

                }
                else
                {
                    if (!firstTeamWon)
                    {
                        start = newMatch.Suggestion6.IndexOf(match.team2[1] + "(");
                        start += match.team2[1].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        while (Char.IsNumber(newMatch.Suggestion6[start]))
                        {
                            integ += newMatch.Suggestion6[start];
                            start++;
                        }
                        integINT = Int32.Parse(integ) + 1;
                        newMatch.Suggestion6 = newMatch.Suggestion6.Replace(match.team2[1] + "(" + integ, match.team2[1] + "(" + integINT);
                    }
                    else
                    {
                        start = newMatch.Suggestion6.IndexOf(match.team2[1] + "(");
                        start += match.team2[1].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        integ2 = "";
                        isOther = false;
                        while (Char.IsNumber(newMatch.Suggestion6[start]))
                        {
                            
                            if (!isOther) integ += newMatch.Suggestion6[start];
                            if (isOther) integ2 += newMatch.Suggestion6[start];
                            start++;
                            if (newMatch.Suggestion6[start] == ',')
                            {
                                start++;
                                isOther = true;
                            }
                        }
                        //integINT = Int32.Parse(integ);
                        integ2INT = Int32.Parse(integ2) + 1;    //Pralaimejimu skaicius
                        newMatch.Suggestion6 = newMatch.Suggestion6.Replace(match.team2[1] + "(" + integ + "," + integ2 + ")", match.team2[1] + "(" + integ + "," + integ2INT + ")");
                    }
                }
            }
            else if (i6 == 0 && newMatch.Suggestion6 == null)
            {
                if (!firstTeamWon) newMatch.Suggestion6 = match.team2[1] + "(1,0)";
                else newMatch.Suggestion6 = match.team2[1] + "(0,1)";

            }
            if (i7 == 0 && newMatch.Suggestion7 != null)
            {
                temp = match.team2[2].ToString() + "(";
                if (newMatch.Suggestion7.IndexOf(temp) == -1)
                {
                    if (!firstTeamWon) newMatch.Suggestion7 += match.team2[2] + "(1,0)";
                    else newMatch.Suggestion7 += match.team2[2] + "(0,1)";

                }
                else
                {
                    if (!firstTeamWon)
                    {
                        start = newMatch.Suggestion7.IndexOf(match.team2[2] + "(");
                        start += match.team2[2].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        while (Char.IsNumber(newMatch.Suggestion7[start]))
                        {
                            integ += newMatch.Suggestion7[start];
                            start++;
                        }
                        integINT = Int32.Parse(integ) + 1;
                        newMatch.Suggestion7 = newMatch.Suggestion7.Replace(match.team2[2] + "(" + integ, match.team2[2] + "(" + integINT);
                    }
                    else
                    {
                        start = newMatch.Suggestion7.IndexOf(match.team2[2] + "(");
                        start += match.team2[2].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        integ2 = "";
                        isOther = false;
                        while (Char.IsNumber(newMatch.Suggestion7[start]))
                        {
                            
                            if (!isOther) integ += newMatch.Suggestion7[start];
                            if (isOther) integ2 += newMatch.Suggestion7[start];
                            start++;
                            if (newMatch.Suggestion7[start] == ',')
                            {
                                start++;
                                isOther = true;
                            }
                        }
                        //integINT = Int32.Parse(integ);
                        integ2INT = Int32.Parse(integ2) + 1;    //Pralaimejimu skaicius
                        newMatch.Suggestion7 = newMatch.Suggestion7.Replace(match.team2[2] + "(" + integ + "," + integ2 + ")", match.team2[2] + "(" + integ + "," + integ2INT + ")");
                    }
                }
            }
            else if (i7 == 0 && newMatch.Suggestion7 == null)
            {
                if (!firstTeamWon) newMatch.Suggestion7 = match.team2[2] + "(1,0)";
                else newMatch.Suggestion7 = match.team2[2] + "(0,1)";

            }
            if (i8 == 0 && newMatch.Suggestion8 != null)
            {
                temp = match.team2[3].ToString() + "(";
                if (newMatch.Suggestion8.IndexOf(temp) == -1)
                {
                    if (!firstTeamWon) newMatch.Suggestion8 += match.team2[3] + "(1,0)";
                    else newMatch.Suggestion8 += match.team2[3] + "(0,1)";

                }
                else
                {
                    if (!firstTeamWon)
                    {
                        start = newMatch.Suggestion8.IndexOf(match.team2[3] + "(");
                        start += match.team2[3].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        while (Char.IsNumber(newMatch.Suggestion8[start]))
                        {
                            integ += newMatch.Suggestion8[start];
                            start++;
                        }
                        integINT = Int32.Parse(integ) + 1;
                        newMatch.Suggestion8 = newMatch.Suggestion8.Replace(match.team2[3] + "(" + integ, match.team2[3] + "(" + integINT);
                    }
                    else
                    {
                        start = newMatch.Suggestion8.IndexOf(match.team2[3] + "(");
                        start += match.team2[3].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        integ2 = "";
                        isOther = false;
                        while (Char.IsNumber(newMatch.Suggestion8[start]))
                        {
                            if (!isOther) integ += newMatch.Suggestion8[start];
                            if (isOther) integ2 += newMatch.Suggestion8[start];
                            start++;
                            if (newMatch.Suggestion8[start] == ',')
                            {
                                start++;
                                isOther = true;
                            }
                        }
                        //integINT = Int32.Parse(integ);
                        integ2INT = Int32.Parse(integ2) + 1;    //Pralaimejimu skaicius
                        newMatch.Suggestion8 = newMatch.Suggestion8.Replace(match.team2[3] + "(" + integ + "," + integ2 + ")", match.team2[3] + "(" + integ + "," + integ2INT + ")");
                    }
                }
            }
            else if (i8 == 0 && newMatch.Suggestion8 == null)
            {
                if (!firstTeamWon) newMatch.Suggestion8 = match.team2[3] + "(1,0)";
                else newMatch.Suggestion8 = match.team2[3] + "(0,1)";

            }
            if (i9 == 0 && newMatch.Suggestion9 != null)
            {
                temp = match.team2[4].ToString() + "(";
                if (newMatch.Suggestion9.IndexOf(temp) == -1)
                {
                    if (!firstTeamWon) newMatch.Suggestion9 += match.team2[4] + "(1,0)";
                    else newMatch.Suggestion9 += match.team2[4] + "(0,1)";

                }
                else
                {
                    if (!firstTeamWon)
                    {
                        start = newMatch.Suggestion9.IndexOf(match.team2[4] + "(");
                        start += match.team2[4].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        while (Char.IsNumber(newMatch.Suggestion9[start]))
                        {
                            integ += newMatch.Suggestion9[start];
                            start++;
                        }
                        integINT = Int32.Parse(integ) + 1;
                        newMatch.Suggestion9 = newMatch.Suggestion9.Replace(match.team2[4] + "(" + integ, match.team2[4] + "(" + integINT);
                    }
                    else
                    {
                        start = newMatch.Suggestion9.IndexOf(match.team2[4] + "(");
                        start += match.team2[4].ToString().Length + 1;      //Neefektyvu
                        integ = "";
                        integ2 = "";
                        isOther = false;
                        while (Char.IsNumber(newMatch.Suggestion9[start]))
                        {
                            if (!isOther) integ += newMatch.Suggestion9[start];
                            if (isOther) integ2 += newMatch.Suggestion9[start];
                            start++;
                            if (newMatch.Suggestion9[start] == ',')
                            {
                                start++;
                                isOther = true;
                            }
                        }
                        //integINT = Int32.Parse(integ);
                        integ2INT = Int32.Parse(integ2) + 1;    //Pralaimejimu skaicius
                        newMatch.Suggestion9 = newMatch.Suggestion9.Replace(match.team2[4] + "(" + integ + "," + integ2 + ")", match.team2[4] + "(" + integ + "," + integ2INT + ")");
                    }
                }
            }
            else if (i9 == 0 && newMatch.Suggestion9 == null)
            {
                if (!firstTeamWon) newMatch.Suggestion9 = match.team2[4] + "(1,0)";
                else newMatch.Suggestion9 = match.team2[4] + "(0,1)";

            }

            return newMatch;
        }


    }
}
