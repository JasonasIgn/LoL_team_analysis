﻿using AutoMapper;
using Analysis.Application.main.match.dto;
using Analysis.EF.entities;
using Analysis.EF.repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.IO;

namespace Analysis.Application.main.generalData
{
    public class GeneralDataService : IGeneralDataService
    {
        protected readonly IMapper _mapper;
        protected readonly IGeneralDataRepository _generalDataRepository;

        public GeneralDataService(IGeneralDataRepository GeneralDataRepository, IMapper mapper)
        {
            _generalDataRepository = GeneralDataRepository;
            _mapper = mapper;
        }



    }
}