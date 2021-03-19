using NetWorthCalculator.Entities.Enums;
using NetWorthCalculator.Entities.Models;
using System.Threading.Tasks;

namespace NetWorthCalculator.Core.BalanceSheets
{
	public interface IBalanceSheetManager
	{
		/// <summary>
		/// Updates the currency on the balance sheet, converting all asset and liability amounts to specified currency
		/// </summary>
		/// <param name="targetCurrency">Currency we are switching to.</param>
		/// <returns>BalanceSheet with all amounts converted to specified currency.</returns>
		Task<BalanceSheet> UpdateCurrencyAsync(Currency targetCurrency);

		/// <summary>
		/// Updates the asset amount. Net worth and asset total is recalculated.
		/// </summary>
		/// <param name="assetId">The asset id.</param>
		/// <param name="newAmount">The new amount.</param>
		/// <param name="currentCurrency">The current currency.</param>
		/// <returns>BalanceSheet with recalculated totals.</returns>
		BalanceSheet UpdateAssetAmount(int assetId, decimal newAmount, Currency currentCurrency);

		/// <summary>
		/// Updates the asset amount. Net worth and asset total is recalculated.
		/// </summary>
		/// <param name="liabilityId">The liability identifier.</param>
		/// <param name="newAmount">The new amount.</param>
		/// <param name="currentCurrency">The current currency.</param>
		/// <returns>BalanceSheet with recalculated totals.</returns>
		BalanceSheet UpdateLiabilityAmount(int liabilityId, decimal newAmount, Currency currentCurrency);
	}
}
