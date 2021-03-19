using NetWorthCalculator.Entities.Enums;
using System.Threading.Tasks;

namespace NetWorthCalculator.Core.ExchangeRates
{
	public interface IExchangeRatesService
	{
		/// <summary>
		/// Calls exchangeratespi.io to get latest currency rate for the specified currency.
		/// </summary>
		/// <param name="targetCurrency">The target currency.</param>
		/// <returns>Rate as "decimal" for currency</returns>
		Task<decimal> GetLatestExchangeRate(Currency targetCurrency);
	}
}
