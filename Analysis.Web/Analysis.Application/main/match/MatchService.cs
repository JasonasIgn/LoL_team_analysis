using AutoMapper;
using Analysis.Application.main.match.dto;
using Analysis.EF.entities;
using Analysis.EF.repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.IO;

namespace Analysis.Application.main.match
{
    public class MatchService : IMatchService
    {
        protected readonly IMapper _mapper;
        protected readonly IMatchRepository _matchRepository;

        public MatchService(IMatchRepository MatchRepository, IMapper mapper)
        {
            _matchRepository = MatchRepository;
            _mapper = mapper;
        }

        public string GetMatchById(long id, string api)
        {
            string match = _matchRepository.GetMatchById(id, api);
            return match;
        }

        
    }
}
