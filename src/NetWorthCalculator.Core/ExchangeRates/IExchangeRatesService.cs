using NetWorthCalculator.Entities.Enums;
using System.Threading.Tasks;

namespace NetWorthCalculator.Core.ExchangeRates
{
	public interface IExchangeRatesService
	{
		Task<decimal> GetLatestExchangeRate(Currency targetCurrency);
	}
}
