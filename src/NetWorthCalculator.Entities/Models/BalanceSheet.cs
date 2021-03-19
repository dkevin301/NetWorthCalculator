using System.Collections.Generic;
using NetWorthCalculator.Entities.Enums;

namespace NetWorthCalculator.Entities.Models
{
    public class BalanceSheet
    {
        public int Id { get; set; }

        public Currency Currency { get; set; }

        public decimal NetWorth { get; set; }

        public decimal TotalAssets { get; set; }

        public decimal TotalLiabilities { get; set; }

        public List<Asset> Assets { get; set; }

        public List<Liability> Liabilities { get; set; }
    }
}
