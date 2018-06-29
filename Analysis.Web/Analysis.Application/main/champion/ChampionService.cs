using Analysis.Application.main.match.dto;
using Analysis.EF.entities;
using Analysis.EF.repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.IO;

namespace Analysis.Application.main.champion
{
    public class ChampionService : IChampionService
    {
        protected readonly IChampionRepository _championRepository;

        public ChampionService(IChampionRepository ChampionRepository)
        {
            _championRepository = ChampionRepository;
        }
        public List<Champion> UpdateChampions(string api)
        {
            return _championRepository.UpdateChampions(api);
        }

        public List<Champion> GetAll()
        {
            return _championRepository.GetAll();
        }
    }
}
