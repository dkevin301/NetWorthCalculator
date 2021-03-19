using NetWorthCalculator.Core.BalanceSheets;
using NetWorthCalculator.Core.ExchangeRates;
using NetWorthCalculator.Core.Repositories;
using NetWorthCalculator.Entities.Enums;
using NetWorthCalculator.Entities.Models;
using NSubstitute;
using Shouldly;
using System;
using System.Collections.Generic;
using Xunit;

namespace NetWorthCalculator.Tests.Core.BalanceSheets
{
	public class BalanceSheetManager_Tests
	{
		[Fact]
		public async void UpdateCurrencyAsync_ValidCurrency_ReturnsUpdatedBalanceSheet()
		{
			// Arrange
			var currency = Currency.AUD;
			var rate = 1.35m;

			// Original is for used for comparison with the updated one
			var originalBalanceSheet = CreateMockBalanceSheet();

			var mockExchangeRatesService = Substitute.For<IExchangeRatesService>();
			mockExchangeRatesService.GetLatestExchangeRate(default).ReturnsForAnyArgs(1.35m);

			var mockRepository = Substitute.For<IBalanceSheetRepository>();
			mockRepository.Get().ReturnsForAnyArgs(CreateMockBalanceSheet());
			mockRepository.Update(default);

			var balanceSheetManager = new BalanceSheetManager(mockExchangeRatesService, mockRepository);

			// Act
			var updatedSheet = await balanceSheetManager.UpdateCurrencyAsync(currency);

			// Assert
			updatedSheet.Currency.ShouldBe(currency);
			updatedSheet.NetWorth.ShouldBe(originalBalanceSheet.NetWorth * rate);
			updatedSheet.TotalAssets.ShouldBe(originalBalanceSheet.TotalAssets * rate);
			updatedSheet.TotalLiabilities.ShouldBe(originalBalanceSheet.TotalLiabilities * rate);
			
			for (int i = 0; i < updatedSheet.Assets.Count; i++)
			{
				updatedSheet.Assets[i].Amount.ShouldBe(originalBalanceSheet.Assets[i].Amount * rate);
			}

			for (int i = 0; i < updatedSheet.Liabilities.Count; i++)
			{
				updatedSheet.Liabilities[i].Amount.ShouldBe(originalBalanceSheet.Liabilities[i].Amount * rate);
				updatedSheet.Liabilities[i].IntervalAmount.ShouldBe(originalBalanceSheet.Liabilities[i].IntervalAmount * rate);
			}
		}

		[Fact]
		public void UpdateAssetAmount_ValidInputs_ReturnsUpdatedBalanceSheet()
		{
			// Arrange
			var assetId = 1;
			var newAmount = 300.5m;
			var currentCurrency = Currency.CAD;

			var originalBalanceSheet = CreateMockBalanceSheet();
			var indexOfAsset = originalBalanceSheet.Assets.FindIndex(a => a.Id == assetId);

			var mockExchangeRatesService = Substitute.For<IExchangeRatesService>();

			var mockRepository = Substitute.For<IBalanceSheetRepository>();
			mockRepository.Get().ReturnsForAnyArgs(CreateMockBalanceSheet());
			mockRepository.Update(default);

			var balanceSheetManager = new BalanceSheetManager(mockExchangeRatesService, mockRepository);

			// Act
			var updatedSheet = balanceSheetManager.UpdateAssetAmount(assetId, newAmount, currentCurrency);

			// Assert
			updatedSheet.Assets[indexOfAsset].Amount.ShouldBe(newAmount);
			updatedSheet.NetWorth.ShouldBe(856);
			updatedSheet.TotalAssets.ShouldBe(756);
		}

		[Fact]
		public void UpdateAssetAmount_MismatchCurrency_ReturnArgumentException()
		{
			// Arrange
			var assetId = 1;
			var anotherCurrency = Currency.JPY;

			var mockBalanceSheet = CreateMockBalanceSheet();

			var indexOfAsset = mockBalanceSheet.Assets.FindIndex(a => a.Id == assetId);

			var mockExchangeRatesService = Substitute.For<IExchangeRatesService>();

			var mockRepository = Substitute.For<IBalanceSheetRepository>();
			mockRepository.Get().ReturnsForAnyArgs(mockBalanceSheet);
			mockRepository.Update(default);

			var balanceSheetManager = new BalanceSheetManager(mockExchangeRatesService, mockRepository);

			// Act
			// Assert
			Should.Throw<ArgumentException>(() => balanceSheetManager.UpdateAssetAmount(assetId, 5, anotherCurrency));
		}

		[Fact]
		public void UpdateAssetAmount_NonExistentAsset_ReturnNullReference()
		{
			// Arrange
			var assetId = 345098;

			var mockBalanceSheet = CreateMockBalanceSheet();

			var indexOfAsset = mockBalanceSheet.Assets.FindIndex(a => a.Id == assetId);

			var mockExchangeRatesService = Substitute.For<IExchangeRatesService>();

			var mockRepository = Substitute.For<IBalanceSheetRepository>();
			mockRepository.Get().ReturnsForAnyArgs(mockBalanceSheet);
			mockRepository.Update(default);

			var balanceSheetManager = new BalanceSheetManager(mockExchangeRatesService, mockRepository);

			// Act
			// Assert
			Should.Throw<NullReferenceException>(() => balanceSheetManager.UpdateAssetAmount(assetId, 5, Currency.CAD));
		}

		[Fact]
		public void UpdateLiabilityAmount_ValidInputs_ReturnsUpdatedBalanceSheet()
		{
			// Arrange
			var liabilityId = 1;
			var newAmount = 300.5m;
			var currentCurrency = Currency.CAD;

			var originalBalanceSheet = CreateMockBalanceSheet();
			var indexOfLiability = originalBalanceSheet.Liabilities.FindIndex(l => l.Id == liabilityId);

			var mockExchangeRatesService = Substitute.For<IExchangeRatesService>();

			var mockRepository = Substitute.For<IBalanceSheetRepository>();
			mockRepository.Get().ReturnsForAnyArgs(CreateMockBalanceSheet());
			mockRepository.Update(default);

			var balanceSheetManager = new BalanceSheetManager(mockExchangeRatesService, mockRepository);

			// Act
			var updatedSheet = balanceSheetManager.UpdateLiabilityAmount(liabilityId, newAmount, currentCurrency);

			// Assert
			updatedSheet.Liabilities[indexOfLiability].Amount.ShouldBe(newAmount);
			updatedSheet.NetWorth.ShouldBe(956);
			updatedSheet.TotalLiabilities.ShouldBe(400.5m);
		}

		[Fact]
		public void UpdateLiabilityAmount_MismatchCurrency_ReturnArgumentException()
		{
			// Arrange
			var liabilityId = 1;
			var anotherCurrency = Currency.JPY;

			var mockBalanceSheet = CreateMockBalanceSheet();

			var indexOfLiability = mockBalanceSheet.Liabilities.FindIndex(l => l.Id == liabilityId);

			var mockExchangeRatesService = Substitute.For<IExchangeRatesService>();

			var mockRepository = Substitute.For<IBalanceSheetRepository>();
			mockRepository.Get().ReturnsForAnyArgs(mockBalanceSheet);
			mockRepository.Update(default);

			var balanceSheetManager = new BalanceSheetManager(mockExchangeRatesService, mockRepository);

			// Act
			// Assert
			Should.Throw<ArgumentException>(() => balanceSheetManager.UpdateLiabilityAmount(liabilityId, 5, anotherCurrency));
		}

		[Fact]
		public void UpdateLiabilityAmount_NonExistentAsset_ReturnNullReference()
		{
			// Arrange
			var liabilityId = 345098;

			var mockBalanceSheet = CreateMockBalanceSheet();

			var indexOfLiability = mockBalanceSheet.Liabilities.FindIndex(l => l.Id == liabilityId);

			var mockExchangeRatesService = Substitute.For<IExchangeRatesService>();

			var mockRepository = Substitute.For<IBalanceSheetRepository>();
			mockRepository.Get().ReturnsForAnyArgs(mockBalanceSheet);
			mockRepository.Update(default);

			var balanceSheetManager = new BalanceSheetManager(mockExchangeRatesService, mockRepository);

			// Act
			// Assert
			Should.Throw<NullReferenceException>(() => balanceSheetManager.UpdateLiabilityAmount(liabilityId, 5, Currency.CAD));
		}

		private BalanceSheet CreateMockBalanceSheet()
		{
			var assets = new List<Asset>()
			{
				new Asset()
				{
					Id = 1,
					Amount = 100,
					Description = "Chequing",
					Group = AssetGroup.CashAndInvestments,
					Order = 1,
				},
				new Asset()
				{
					Id = 2,
					Amount = 455.5m,
					Description = "Savings",
					Group = AssetGroup.CashAndInvestments,
					Order = 2,
				}
			};

			var liabilities = new List<Liability>()
			{
				new Liability()
				{
					Id = 1,
					Amount = 100,
					Description = "Mortgage",
					Group = LiabilityGroup.LongTerm,
					Order = 1,
				},
				new Liability()
				{
					Id = 2,
					Amount = 100,
					Description = "Mortgage",
					Group = LiabilityGroup.LongTerm,
					Order = 1,
				}
			};

			var balanceSheet = new BalanceSheet()
			{
				Id = 1,
				TotalAssets = 555.5m,
				TotalLiabilities = 100,
				NetWorth = 455.5m,
				Assets = assets,
				Liabilities = liabilities,
				Currency = Currency.CAD,
			};

			return balanceSheet;
		}
	}
}
