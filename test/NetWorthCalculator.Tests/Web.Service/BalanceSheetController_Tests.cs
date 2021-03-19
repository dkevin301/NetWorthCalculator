using NetWorthCalculator.Core.BalanceSheets;
using NetWorthCalculator.Core.ExchangeRates;
using NetWorthCalculator.Core.Repositories;
using NetWorthCalculator.Entities.Enums;
using NetWorthCalculator.Entities.Models;
using NetWorthCalculator.Web.Service.Controllers.BalanceSheet;
using NetWorthCalculator.Web.Service.Controllers.BalanceSheet.Dto;
using NetWorthCalculator.Web.Service.Exceptions;
using NSubstitute;
using Shouldly;
using System;
using System.Collections.Generic;
using Xunit;

namespace NetWorthCalculator.Tests.Web.Service
{
	public class BalanceSheetController_Tests
	{
		[Fact]
		public async void UpdateCurrency_ValidInputs_ReturnsBalanceSheetDto()
		{
			// Arrange
			var mockRequest = new UpdateCurrencyRequest()
			{
				TargetCurrency = "CAD"
			};

			var mockBalanceSheet = CreateMockBalanceSheet();

			var mockBalanceSheetManager = Substitute.For<IBalanceSheetManager>();
			mockBalanceSheetManager.UpdateCurrencyAsync(default).ReturnsForAnyArgs(mockBalanceSheet);

			// Act
			var balanceSheetDto = await new BalanceSheetController(mockBalanceSheetManager).UpdateCurrency(mockRequest);

			// Assert
			balanceSheetDto.Id.ShouldBe(mockBalanceSheet.Id);
			balanceSheetDto.Currency.ShouldBe(mockBalanceSheet.Currency);
			balanceSheetDto.NetWorth.ShouldBe(mockBalanceSheet.NetWorth);
			balanceSheetDto.TotalAssets.ShouldBe(mockBalanceSheet.TotalAssets);
			balanceSheetDto.TotalLiabilities.ShouldBe(mockBalanceSheet.TotalLiabilities);

			for (int i = 0; i < balanceSheetDto.Assets.Count; i++)
			{
				balanceSheetDto.Assets[i].Id.ShouldBe(mockBalanceSheet.Assets[i].Id);
				balanceSheetDto.Assets[i].Amount.ShouldBe(mockBalanceSheet.Assets[i].Amount);
				balanceSheetDto.Assets[i].Description.ShouldBe(mockBalanceSheet.Assets[i].Description);
				balanceSheetDto.Assets[i].Group.ShouldBe(mockBalanceSheet.Assets[i].Group);
				balanceSheetDto.Assets[i].Order.ShouldBe(mockBalanceSheet.Assets[i].Order);
			}

			for (int i = 0; i < balanceSheetDto.Liabilities.Count; i++)
			{
				balanceSheetDto.Liabilities[i].Id.ShouldBe(mockBalanceSheet.Liabilities[i].Id);
				balanceSheetDto.Liabilities[i].Amount.ShouldBe(mockBalanceSheet.Liabilities[i].Amount);
				balanceSheetDto.Liabilities[i].Description.ShouldBe(mockBalanceSheet.Liabilities[i].Description);
				balanceSheetDto.Liabilities[i].Group.ShouldBe(mockBalanceSheet.Liabilities[i].Group);
				balanceSheetDto.Liabilities[i].Order.ShouldBe(mockBalanceSheet.Liabilities[i].Order);
				balanceSheetDto.Liabilities[i].PaymentInterval.ShouldBe(mockBalanceSheet.Liabilities[i].PaymentInterval);
				balanceSheetDto.Liabilities[i].IntervalAmount.ShouldBe(mockBalanceSheet.Liabilities[i].IntervalAmount);
			}
		}

		[Fact]
		public void UpdateCurrency_InvalidCurrency_ReturnsErrorDto()
		{
			// Arrange
			var mockRequest = new UpdateCurrencyRequest()
			{
				TargetCurrency = "MMMMZZZ"
			};

			var mockBalanceSheet = CreateMockBalanceSheet();

			var mockBalanceSheetManager = Substitute.For<IBalanceSheetManager>();
			mockBalanceSheetManager.UpdateCurrencyAsync(default).ReturnsForAnyArgs(mockBalanceSheet);

			// Act
			// Assert
			Should.Throw<HttpResponseException>(async () => await new BalanceSheetController(mockBalanceSheetManager).UpdateCurrency(mockRequest));
		}

		[Fact]
		public void UpdateAssetAmount_ValidInputs_ReturnsBalanceSheetDto()
		{
			// Arrange
			var mockRequest = new UpdateAssetAmountRequest()
			{
				AssetId = 1,
				Currency = "CAD",
				NewAmount = 500
			};

			var mockBalanceSheet = CreateMockBalanceSheet();

			var mockBalanceSheetManager = Substitute.For<IBalanceSheetManager>();
			mockBalanceSheetManager.UpdateAssetAmount(default, default, default).ReturnsForAnyArgs(mockBalanceSheet);

			// Act
			var response = new BalanceSheetController(mockBalanceSheetManager).UpdateAssetAmount(mockRequest);

			// Assert
			response.AssetId.ShouldBe(1);
			response.NewAmount.ShouldBe(500);
			response.NewAssetTotal.ShouldBe(mockBalanceSheet.TotalAssets);
			response.NewNetWorth.ShouldBe(mockBalanceSheet.NetWorth);
		}

		[Theory]
		[InlineData(-1000, "CAD", 500)]
		[InlineData(1, "MMMZZZ", 500)]
		[InlineData(1, "CAD", 1000000000000)] // Trillion
		public void UpdateAssetAmount_InvalidInput_ReturnsErrorDto(int assetId, string currency, decimal newAmount)
		{
			// Arrange
			var mockRequest = new UpdateAssetAmountRequest()
			{
				AssetId = assetId,
				Currency = currency,
				NewAmount = newAmount
			};

			var mockBalanceSheet = CreateMockBalanceSheet();

			var mockBalanceSheetManager = Substitute.For<IBalanceSheetManager>();
			mockBalanceSheetManager.UpdateCurrencyAsync(default).ReturnsForAnyArgs(mockBalanceSheet);

			// Act
			// Assert
			Should.Throw<HttpResponseException>(() => new BalanceSheetController(mockBalanceSheetManager).UpdateAssetAmount(mockRequest));
		}

		[Fact]
		public void UpdateLiabilityAmount_ValidInputs_ReturnsBalanceSheetDto()
		{
			// Arrange
			var mockRequest = new UpdateLiabilityAmountRequest()
			{
				LiabilityId = 1,
				Currency = "CAD",
				NewAmount = 500
			};

			var mockBalanceSheet = CreateMockBalanceSheet();

			var mockBalanceSheetManager = Substitute.For<IBalanceSheetManager>();
			mockBalanceSheetManager.UpdateLiabilityAmount(default, default, default).ReturnsForAnyArgs(mockBalanceSheet);

			// Act
			var response = new BalanceSheetController(mockBalanceSheetManager).UpdateLiabilityAmount(mockRequest);

			// Assert
			response.LiabilityId.ShouldBe(1);
			response.NewAmount.ShouldBe(500);
			response.NewLiabilityTotal.ShouldBe(mockBalanceSheet.TotalLiabilities);
			response.NewNetWorth.ShouldBe(mockBalanceSheet.NetWorth);
		}

		[Theory]
		[InlineData(-1000, "CAD", 500)]
		[InlineData(1, "MMMZZZ", 500)]
		[InlineData(1, "CAD", 1000000000000)] // Trillion
		public void UpdateLiabilityAmount_InvalidInput_ReturnsErrorDto(int liabilityId, string currency, decimal newAmount)
		{
			// Arrange
			var mockRequest = new UpdateLiabilityAmountRequest()
			{
				LiabilityId = liabilityId,
				Currency = currency,
				NewAmount = newAmount
			};

			var mockBalanceSheet = CreateMockBalanceSheet();

			var mockBalanceSheetManager = Substitute.For<IBalanceSheetManager>();
			mockBalanceSheetManager.UpdateCurrencyAsync(default).ReturnsForAnyArgs(mockBalanceSheet);

			// Act
			// Assert
			Should.Throw<HttpResponseException>(() => new BalanceSheetController(mockBalanceSheetManager).UpdateLiabilityAmount(mockRequest));
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
