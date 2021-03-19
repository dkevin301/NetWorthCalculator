namespace NetWorthCalculator.Web.Service.Controllers.BalanceSheet.Dto
{
	public class UpdateLiabilityAmountResponse
	{
		public int LiabilityId { get; set; }

		public decimal NewAmount { get; set; }

		public decimal NewLiabilityTotal { get; set; }

		public decimal NewNetWorth { get; set; }
	}
}
