using NetWorthCalculator.Entities.Enums;

namespace NetWorthCalculator.Web.Service.Controllers.BalanceSheet.Dto
{
	public class AssetDto
	{
		public int Id { get; set; }

		public decimal Amount { get; set; }

		public string Description { get; set; }

		public AssetGroup Group { get; set; }

		public int Order { get; set; }
	}
}
