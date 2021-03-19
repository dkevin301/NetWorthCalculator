namespace NetWorthCalculator.Web.Service.Controllers.BalanceSheet.Dto
{
	public class UpdateAssetAmountRequest
	{
		public int AssetId { get; set; }

		public decimal NewAmount { get; set; }

		public string Currency { get; set; }
	}
}
