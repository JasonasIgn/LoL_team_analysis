using Analysis.EF.entities;
using System.Collections.Generic;

namespace Analysis.EF.repositories
{
    public  interface IGeneralDataRepository
    {
        GeneralData GetById(int id);
        GeneralData UpdateGeneralData(GeneralData data);
    }
}