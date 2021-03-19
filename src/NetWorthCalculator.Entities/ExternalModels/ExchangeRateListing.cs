using System;

namespace NetWorthCalculator.Entities.ExternalModels
{
	public class ExchangeRateListing
	{
		public string Base { get; set; }

		public DateTime Date { get; set; }

		public ExchangeRates Rates { get; set; }
	}
}
