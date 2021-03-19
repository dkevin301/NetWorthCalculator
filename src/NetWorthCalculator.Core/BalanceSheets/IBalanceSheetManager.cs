using NetWorthCalculator.Entities.Enums;
using NetWorthCalculator.Entities.Models;
using System.Threading.Tasks;

namespace NetWorthCalculator.Core.BalanceSheets
{
	public interface IBalanceSheetManager
	{
		Task<BalanceSheet> UpdateCurrencyAsync(Currency targetCurrency);

		BalanceSheet UpdateAssetAmount(int assetId, decimal newAmount, Currency currentCurrency);

		BalanceSheet UpdateLiabilityAmount(int liabilityId, decimal newAmount, Currency currentCurrency);
	}
}
