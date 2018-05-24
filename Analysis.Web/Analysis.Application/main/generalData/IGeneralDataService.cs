using Analysis.EF.entities;

namespace Analysis.Application.main.generalData
{
    public interface IGeneralDataService
    {
        GeneralData GetById(int id);
        GeneralData UpdateGeneralData(GeneralData data);
    }
}