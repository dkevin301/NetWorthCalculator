using NetWorthCalculator.Entities.Models;

namespace NetWorthCalculator.Core.Repositories
{
    public interface IBalanceSheetRepository
    {
        BalanceSheet Get();

        void Update(BalanceSheet target);

        string GetCurrencyAsString();
    }
}
