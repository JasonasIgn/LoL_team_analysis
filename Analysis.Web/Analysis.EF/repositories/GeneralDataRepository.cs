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
    public class GeneralDataRepository : Repository<GeneralData>, IGeneralDataRepository
    {
        public GeneralDataRepository(AnalysisContext context) : base(context)
        {

        }

        public AnalysisContext AnalysisContext
        {
            get { return Context as AnalysisContext; }
        }


        public GeneralData GetById (int id)
        {
            return AnalysisContext.GeneralData
                .SingleOrDefault(p => p.Id == id);
        }
        
        public GeneralData UpdateGeneralData(GeneralData data)
        {
            AnalysisContext.Update(data);
            AnalysisContext.SaveChanges();
            return data;
        }
    }
}