using NetWorthCalculator.Entities.Enums;
using System.Collections.Generic;

namespace NetWorthCalculator.Web.Service.Controllers.BalanceSheet.Dto
{
	public class BalanceSheetDto
	{
		public int Id { get; set; }

		public Currency Currency { get; set; }

		public decimal NetWorth { get; set; }

		public decimal TotalAssets { get; set; }

		public decimal TotalLiabilities { get; set; }

		public List<AssetDto> Assets { get; set; }

		public List<LiabilityDto> Liabilities { get; set; }
	}
}
