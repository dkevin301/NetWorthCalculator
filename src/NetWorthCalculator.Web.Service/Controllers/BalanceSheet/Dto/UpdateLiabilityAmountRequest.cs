namespace NetWorthCalculator.Web.Service.Controllers.BalanceSheet.Dto
{
	public class UpdateLiabilityAmountRequest
	{
		public int LiabilityId { get; set; }

		public decimal NewAmount { get; set; }

		public string Currency { get; set; }
	}
}
