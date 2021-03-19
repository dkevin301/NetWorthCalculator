using NetWorthCalculator.Core.Repositories;
using NetWorthCalculator.Entities.Enums;
using NetWorthCalculator.Entities.ExternalModels;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace NetWorthCalculator.Core.ExchangeRates
{
	public class ExchangeRatesService : IExchangeRatesService
	{
		public HttpClient Client { get; }

		private IBalanceSheetRepository BalanceSheetRepository;

		private JsonSerializerOptions JsonSerializerOptions;

		public ExchangeRatesService(HttpClient client, IBalanceSheetRepository balanceSheetRepository)
		{
			this.JsonSerializerOptions = new JsonSerializerOptions()
			{
				PropertyNameCaseInsensitive = true
			};

			this.BalanceSheetRepository = balanceSheetRepository;

			client.BaseAddress = new Uri(NetWorthConsts.EXCHANGE_RATE_API_URL);

			Client = client;
		}

		/// <inheritdoc />
		public async Task<decimal> GetLatestExchangeRate(Currency targetCurrency)
		{
			try
			{
				// Get ISO-4217 string representation of the currency we are interested in. Assumes enums are named in such a manner.
				var isoCurrencyStr = targetCurrency.ToString();

				var response = await Client.GetAsync($"latest?base={this.BalanceSheetRepository.GetCurrencyAsString()}&symbols={isoCurrencyStr}");

				response.EnsureSuccessStatusCode();

				using var responseStream = await response.Content.ReadAsStreamAsync();
				var exchangeRateListing = await JsonSerializer.DeserializeAsync<ExchangeRateListing>(responseStream, this.JsonSerializerOptions);

				return this.GetTargetRateFromResponse(exchangeRateListing, targetCurrency);
			}
			catch (HttpRequestException)
			{
				throw new Exception("An error occurred while contacting the exchange rate service.");
			}
			catch (ArgumentNullException argumentNull)
			{
				throw argumentNull;
			}
			catch (Exception)
			{
				throw new Exception("An error occurred while parsing the response form the exchange rate service.");
			}
		}

		private decimal GetTargetRateFromResponse(ExchangeRateListing listing, Currency targetCurrency)
		{
			decimal? rate;

			switch (targetCurrency)
			{
				case Currency.AUD:
					rate = listing.Rates.AUD;
					break;
				case Currency.CAD:
					rate = listing.Rates.CAD;
					break;
				case Currency.CNY:
					rate = listing.Rates.CNY;
					break;
				case Currency.GBP:
					rate = listing.Rates.GBP;
					break;
				case Currency.EUR:
					rate = listing.Rates.EUR;
					break;
				case Currency.JPY:
					rate = listing.Rates.JPY;
					break;
				case Currency.NZD:
					rate = listing.Rates.NZD;
					break;
				case Currency.SEK:
					rate = listing.Rates.SEK;
					break;
				case Currency.USD:
					rate = listing.Rates.USD;
					break;
				case Currency.ZAR:
					rate = listing.Rates.ZAR;
					break;
				default:
					rate = null;
					break;
			}

			if (rate == null)
			{
				throw new ArgumentNullException($"A rate was not returned from the service for {targetCurrency.ToString()}.");
			}

			return (decimal)rate;
		}
	}
}
