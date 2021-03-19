namespace NetWorthCalculator.Web.Service.Controllers.BalanceSheet.Dto
{
	public class UpdateAssetAmountResponse
	{
		public int AssetId { get; set; }

		public decimal NewAmount { get; set; }

		public decimal NewAssetTotal { get; set; }

		public decimal NewNetWorth { get; set; }
	}
}
