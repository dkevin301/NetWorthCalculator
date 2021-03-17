using NetWorthCalculator.Core.CurrencyRate;
using NetWorthCalculator.Core.Repositories;
using NetWorthCalculator.Entities.Models;
using System.Threading.Tasks;

namespace NetWorthCalculator.Core.BalanceSheets
{
	public class BalanceSheetManager : IBalanceSheetManager
    {
        private readonly ExchangeRatesService ExchangeRatesService;

        private IBalanceSheetRepository BalanceSheetRepository;

        public BalanceSheetManager(
            ExchangeRatesService exchangeRatesService,
            IBalanceSheetRepository balanceSheetRepository
        )
        {
            this.ExchangeRatesService = exchangeRatesService;
            this.BalanceSheetRepository = balanceSheetRepository;
        }

        public async Task UpdateCurrencyAsync()
		{
            await this.ExchangeRatesService.GetLatest();
		}
    }
}
