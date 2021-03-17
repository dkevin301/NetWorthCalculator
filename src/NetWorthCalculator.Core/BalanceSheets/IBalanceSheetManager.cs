using System.Threading.Tasks;

namespace NetWorthCalculator.Core.BalanceSheets
{
	public interface IBalanceSheetManager
	{
		Task UpdateCurrencyAsync();
	}
}
