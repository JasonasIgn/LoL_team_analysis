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
    public class ChampionRepository : Repository<Match>, IChampionRepository
    {
        public ChampionRepository(AnalysisContext context) : base(context)
        {

        }

        public AnalysisContext AnalysisContext
        {
            get { return Context as AnalysisContext; }
        }

        public List<Champion> UpdateChampions(string api)
        {
            string url = "https://euw1.api.riotgames.com/lol/static-data/v3/champions" + "?api_key=" + api;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            try
            {
                WebResponse response = request.GetResponse();
                using (Stream responseStream = response.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream, Encoding.UTF8);
                    RiotMatch match = new RiotMatch();
                    int start;
                    Champion champ = new Champion();
                    List<Champion> list = new List<Champion>();
                    string title = "";
                    string key = "";
                    string name = "";
                    int id = 0;
                    string idString = "";
                    string responseString = reader.ReadToEnd();
                    while (responseString.IndexOf("title") != -1)
                    {
                        start = responseString.IndexOf("title");
                        responseString = responseString.Remove(start, 8);
                        while (responseString[start] != '"')
                        {
                            title += responseString[start];
                            start++;
                        }



                        start = responseString.IndexOf("\"id");
                        responseString = responseString.Remove(start, 5);
                        while (Char.IsNumber(responseString[start]))
                        {
                            idString += responseString[start];
                            start++;
                        }
                        id = Int32.Parse(idString);
                        idString = "";

                        start = responseString.IndexOf("key");
                        responseString = responseString.Remove(start, 6);
                        while (responseString[start] != '"')
                        {
                            key += responseString[start];
                            start++;
                        }

                        start = responseString.IndexOf("name");
                        responseString = responseString.Remove(start, 7);
                        while (responseString[start] != '"')
                        {
                            name += responseString[start];
                            start++;
                        }

                        champ.Title = title;
                        champ.Id = id;
                        champ.Key = key;
                        champ.Name = name;

                        key = "";
                        title = "";
                        id = 0;
                        name = "";

                        list.Add(champ);
                        champ = new Champion();
                    }
                    AnalysisContext.RemoveRange(list);
                    AnalysisContext.AddRange(list);
                    AnalysisContext.SaveChanges();
                    return list;
                }
            }
            catch (WebException ex)
            {
                WebResponse errorResponse = ex.Response;
                throw;
            }
        }

            public List<Champion> GetAll()
            {
                return AnalysisContext.Champion
                    .ToList();
            }
    }
}
