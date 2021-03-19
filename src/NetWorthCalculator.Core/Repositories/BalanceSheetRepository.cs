using NetWorthCalculator.Entities.Enums;
using NetWorthCalculator.Entities.Models;
using System.Collections.Generic;

namespace NetWorthCalculator.Core.Repositories
{
	/// <inheritdoc />
	public class BalanceSheetRepository : IBalanceSheetRepository
    {
        private BalanceSheet BalanceSheet;

        public BalanceSheetRepository()
        {
            this.BalanceSheet = new BalanceSheet()
            {
                Id = 1,
                Currency = Currency.CAD,
                NetWorth = 1212130,
                TotalAssets = 2120427,
                TotalLiabilities = 908297,
                Assets = GetDefaultAssets(),
                Liabilities = GetDefaultLiabilities(),
            };
        }

        private List<Asset> GetDefaultAssets()
        {
            return new List<Asset>()
            {
                new Asset()
                {
                    Id = 1,
                    Group = AssetGroup.CashAndInvestments,
                    Description = "Chequing",
                    Amount = 2000,
                    Order = 1,
                },
                new Asset()
                {
                    Id = 2,
                    Group = AssetGroup.CashAndInvestments,
                    Description = "Savings for Taxes",
                    Amount = 4000,
                    Order = 2,
                },
                new Asset()
                {
                    Id = 3,
                    Group = AssetGroup.CashAndInvestments,
                    Description = "Rainy Day Fund",
                    Amount = 506,
                    Order = 3,
                },
                new Asset()
                {
                    Id = 4,
                    Group = AssetGroup.CashAndInvestments,
                    Description = "Savings for Fun",
                    Amount = 5000,
                    Order = 4,
                },
                new Asset()
                {
                    Id = 5,
                    Group = AssetGroup.CashAndInvestments,
                    Description = "Savings for Travel",
                    Amount = 200,
                    Order = 6,
                },
                new Asset()
                {
                    Id = 6,
                    Group = AssetGroup.CashAndInvestments,
                    Description = "Savings for Personal Development",
                    Amount = 200,
                    Order = 6,
                },
                new Asset()
                {
                    Id = 7,
                    Group = AssetGroup.CashAndInvestments,
                    Description = "Investment 1",
                    Amount = 5000,
                    Order = 7,
                },
                new Asset()
                {
                    Id = 8,
                    Group = AssetGroup.CashAndInvestments,
                    Description = "Investment 2",
                    Amount = 60000,
                    Order = 8,
                },
                new Asset()
                {
                    Id = 9,
                    Group = AssetGroup.CashAndInvestments,
                    Description = "Investment 3",
                    Amount = 24000,
                    Order = 9,
                },
                new Asset()
                {
                    Id = 10,
                    Group = AssetGroup.LongTerm,
                    Description = "Primary Home",
                    Amount = 455000,
                    Order = 1,
                },
                new Asset()
                {
                    Id = 11,
                    Group = AssetGroup.LongTerm,
                    Description = "Second Home",
                    Amount = 1564321,
                    Order = 2,
                },
                new Asset()
                {
                    Id = 12,
                    Group = AssetGroup.LongTerm,
                    Description = "Other",
                    Amount = 0,
                    Order = 3,
                },
            };
        }

        private List<Liability> GetDefaultLiabilities()
        {
            return new List<Liability>()
            {
                new Liability()
                {
                    Id = 1,
                    Amount = 4342,
                    Description = "Credit Card 1",
                    Group = LiabilityGroup.ShortTerm,
                    IntervalAmount = 200,
                    Order = 1,
                    PaymentInterval = PaymentInterval.MonthlyPayment,
                },
                new Liability()
                {
                    Id = 2,
                    Amount = 322,
                    Description = "Credit Card 2",
                    Group = LiabilityGroup.ShortTerm,
                    IntervalAmount = 150,
                    Order = 2,
                    PaymentInterval = PaymentInterval.MonthlyPayment,
                },
                new Liability()
                {
                    Id = 3,
                    Amount = 250999,
                    Description = "Mortgage 1",
                    Group = LiabilityGroup.LongTerm,
                    IntervalAmount = 2000,
                    Order = 1,
                    PaymentInterval = PaymentInterval.MonthlyPayment,
                },
                new Liability()
                {
                    Id = 4,
                    Amount = 632634,
                    Description = "Mortgage 2",
                    Group = LiabilityGroup.LongTerm,
                    IntervalAmount = 632634,
                    Order = 2,
                    PaymentInterval = PaymentInterval.MonthlyPayment,
                },
                new Liability()
                {
                    Id = 5,
                    Amount = 10000,
                    Description = "Line of Credit",
                    Group = LiabilityGroup.LongTerm,
                    IntervalAmount = 500,
                    Order = 3,
                    PaymentInterval = PaymentInterval.MonthlyPayment,
                },
                new Liability()
                {
                    Id = 6,
                    Amount = 10000,
                    Description = "Investment Loan",
                    Group = LiabilityGroup.LongTerm,
                    IntervalAmount = 700,
                    Order = 4,
                    PaymentInterval = PaymentInterval.MonthlyPayment,
                },
            };
        }

        public string GetCurrencyAsString()
		{
            return this.BalanceSheet.Currency.ToString();
		}

        public BalanceSheet Get()
		{
            return this.BalanceSheet;
		}

        public void Update(BalanceSheet target)
        {
            this.BalanceSheet = target;
        }
    }
}
