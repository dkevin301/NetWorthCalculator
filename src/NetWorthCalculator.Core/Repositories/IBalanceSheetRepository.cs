using NetWorthCalculator.Entities.Models;

namespace NetWorthCalculator.Core.Repositories
{
    /// <summary>
    /// Goal of repository classes is to act as the access point for data that needs to be retreived from the database.
    /// It would typically contains basic CRUD functions, but could also contain functions to retreive a dataset with business conditions applied.
    /// For the purposes of this application, the "database" will be an in-memory list.
    /// </summary>
    public interface IBalanceSheetRepository
    {
		BalanceSheet Get();

        void Update(BalanceSheet target);

        string GetCurrencyAsString();
    }
}
