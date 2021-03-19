using NetWorthCalculator.Core.ExchangeRates;
using NetWorthCalculator.Core.Repositories;
using NetWorthCalculator.Entities.Enums;
using NetWorthCalculator.Entities.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace NetWorthCalculator.Core.BalanceSheets
{
	public class BalanceSheetManager : IBalanceSheetManager
    {
        private IExchangeRatesService ExchangeRatesService;

        private IBalanceSheetRepository BalanceSheetRepository;

        public BalanceSheetManager(
            IExchangeRatesService exchangeRatesService,
            IBalanceSheetRepository balanceSheetRepository
        )
        {
            this.ExchangeRatesService = exchangeRatesService;
            this.BalanceSheetRepository = balanceSheetRepository;
        }

        public async Task<BalanceSheet> UpdateCurrencyAsync(Currency targetCurrency)
		{
            // Get the latest exchange rates
            var targetCurrencyRate = await this.ExchangeRatesService.GetLatestExchangeRate(targetCurrency);

            // Get the model and update the amounts and currency
            var balanceSheet = this.BalanceSheetRepository.Get();

            balanceSheet.Currency = targetCurrency;
            balanceSheet.NetWorth *= targetCurrencyRate;
            balanceSheet.TotalAssets *= targetCurrencyRate;
            balanceSheet.TotalLiabilities *= targetCurrencyRate;
            
            foreach (var asset in balanceSheet.Assets)
			{
                asset.Amount *= targetCurrencyRate;
			}

            foreach (var liabilities in balanceSheet.Liabilities)
            {
                liabilities.Amount *= targetCurrencyRate;
                liabilities.IntervalAmount *= targetCurrencyRate;
            }

            // Save the model to the "database"
            this.BalanceSheetRepository.Update(balanceSheet);

            return balanceSheet;
        }

        public BalanceSheet UpdateAssetAmount(int assetId, decimal newAmount, Currency currentCurrency)
		{
            // Get the model and update the amounts and currency
            var balanceSheet = this.BalanceSheetRepository.Get();

            if (currentCurrency != balanceSheet.Currency)
			{
                throw new Exception("Found inconsistent currencies between service and client.");
			}

            // Get the Assets location and update it
            var assets = balanceSheet.Assets.ToList();
            var targetIndex = assets.FindIndex(a => a.Id == assetId);

            if (targetIndex == -1)
			{
                throw new NullReferenceException($"Asset with Id {assetId} does not exist.");
			}

            // Update the value on the asset
            assets[targetIndex].Amount = newAmount;
            balanceSheet.Assets = assets;

            // Update Asset and NW sums
            balanceSheet.TotalAssets = assets.Sum(a => a.Amount);
            balanceSheet.NetWorth = balanceSheet.TotalAssets + balanceSheet.TotalLiabilities;

            // Save the model to the "database"
            this.BalanceSheetRepository.Update(balanceSheet);

            return balanceSheet;
        }

        public BalanceSheet UpdateLiabilityAmount(int liabilityId, decimal newAmount, Currency currentCurrency)
        {
            // Get the model and update the amounts and currency
            var balanceSheet = this.BalanceSheetRepository.Get();

            if (currentCurrency != balanceSheet.Currency)
            {
                throw new Exception("Found inconsistent currencies between service and client.");
            }

            // Get the location of liability and update it
            var liabilities = balanceSheet.Liabilities.ToList();
            var targetIndex = liabilities.FindIndex(a => a.Id == liabilityId);

            if (targetIndex == -1)
            {
                throw new NullReferenceException($"Liability with Id {liabilityId} does not exist.");
            }

            // Update the value on the liability
            liabilities[targetIndex].Amount = newAmount;
            balanceSheet.Liabilities = liabilities;

            // Update liability and networth sums
            balanceSheet.TotalLiabilities = liabilities.Sum(a => a.Amount);
            balanceSheet.NetWorth = balanceSheet.TotalAssets + balanceSheet.TotalLiabilities;

            // Save the model to the "database"
            this.BalanceSheetRepository.Update(balanceSheet);

            return balanceSheet;
        }
    }
}
