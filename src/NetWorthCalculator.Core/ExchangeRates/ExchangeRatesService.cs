using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace NetWorthCalculator.Core.CurrencyRate
{
	public class ExchangeRatesService
	{
		public HttpClient Client { get; }

		public ExchangeRatesService(HttpClient client)
		{
			client.BaseAddress = new Uri("https://api.exchangeratesapi.io/");

			Client = client;
		}

		public async Task GetLatest()
		{
			var response = await Client.GetAsync("latest");

			response.EnsureSuccessStatusCode();

			var responseString = await response.Content.ReadAsStringAsync();
		}
	}
}
