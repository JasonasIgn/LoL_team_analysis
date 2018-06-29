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
        protected readonly IGeneralDataRepository _generalDataRepository;

        public GeneralDataService(IGeneralDataRepository GeneralDataRepository)
        {
            _generalDataRepository = GeneralDataRepository;
        }

        public GeneralData GetById(int id)
        {
            return _generalDataRepository.GetById(id);
        }

        public GeneralData UpdateGeneralData(GeneralData data)
        {
            return _generalDataRepository.UpdateGeneralData(data);
        }

    }
}