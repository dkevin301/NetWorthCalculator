using System;
using Microsoft.AspNetCore.Mvc;
using NetWorthCalculator.Core.BalanceSheets;
using System.Collections.Generic;
using NetWorthCalculator.Web.Service.Exceptions;
using System.Net;
using NetWorthCalculator.Web.Service.Controllers.BalanceSheet.Dto;
using NetWorthCalculator.Entities.Enums;
using System.Threading.Tasks;
using NetWorthCalculator.Core;

namespace NetWorthCalculator.Web.Service.Controllers.BalanceSheet
{
	[Route("api/[controller]")]
    [ApiController]
    public class BalanceSheetController : ControllerBase
    {
        private IBalanceSheetManager BalanceSheetManager { get; }

        public BalanceSheetController(IBalanceSheetManager balanceSheetManager) : base()
        {
            this.BalanceSheetManager = balanceSheetManager;
        }

        // GET: api/<BalanceSheetController>
        [HttpGet]
        public string Get()
        {
            return DateTime.Now.ToString();
        }

        // PUT api/<BalanceSheetController>/updatecurrency
        [HttpPut("updatecurrency")]
        public async Task<BalanceSheetDto> UpdateCurrency([FromBody] UpdateCurrencyRequest currency)
        {
            // Validate the contents of the request object before proceeding.
            var parsedCurrency = IsValidCurrency(currency.TargetCurrency);

            try
			{
                // Main business logic
                var updatedBalanceSheet = await this.BalanceSheetManager.UpdateCurrencyAsync(parsedCurrency);

                // Convert to the DTO
                var assetDtos = new List<AssetDto>();
                foreach (var asset in updatedBalanceSheet.Assets)
				{
                    assetDtos.Add(new AssetDto()
                    {
                        Id = asset.Id,
                        Amount = asset.Amount,
                        Description = asset.Description,
                        Group = asset.Group,
                        Order = asset.Order,
                    });
				}

                var liabilityDtos = new List<LiabilityDto>();
                foreach (var liabilities in updatedBalanceSheet.Liabilities)
                {
                    liabilityDtos.Add(new LiabilityDto()
                    {
                        Id = liabilities.Id,
                        Amount = liabilities.Amount,
                        Description = liabilities.Description,
                        Group = liabilities.Group,
                        IntervalAmount = liabilities.IntervalAmount,
                        Order = liabilities.Order,
                        PaymentInterval = liabilities.PaymentInterval,
                    });
                }

                return new BalanceSheetDto()
                {
                    Id = updatedBalanceSheet.Id,
                    Currency = updatedBalanceSheet.Currency,
                    NetWorth = updatedBalanceSheet.NetWorth,
                    TotalAssets = updatedBalanceSheet.TotalAssets,
                    TotalLiabilities = updatedBalanceSheet.TotalLiabilities,
                    Assets = assetDtos,
                    Liabilities = liabilityDtos,
                };
                
            }
            catch (Exception e)
			{
                throw new HttpResponseException()
                {
                    Status = HttpStatusCode.InternalServerError,
                    Value = e.Message
                };
			}
        }

        [HttpPut("updateassetamount")]
        public UpdateAssetAmountResponse UpdateAssetAmount([FromBody] UpdateAssetAmountRequest data)
		{
            // Validate the contents of the request object before proceeding.
            var parsedCurrency = IsValidCurrency(data.Currency);
            IsLineItemIdInRange(data.AssetId, "asset");
            IsValidAmount(data.NewAmount);

            try
            {
                // Main business logic
                var balanceSheet = this.BalanceSheetManager.UpdateAssetAmount(data.AssetId, data.NewAmount, parsedCurrency);

                // Convert to response object
                return new UpdateAssetAmountResponse()
                {
                    AssetId = data.AssetId,
                    NewAmount = data.NewAmount,
                    NewAssetTotal = balanceSheet.TotalAssets,
                    NewNetWorth = balanceSheet.NetWorth,
                };
			}
            catch (Exception e)
			{
                throw new HttpResponseException()
                {
                    Status = HttpStatusCode.InternalServerError,
                    Value = e.Message
                };
            }
		}

        [HttpPut("updateliabilityamount")]
        public UpdateLiabilityAmountResponse UpdateLiabilityAmount([FromBody] UpdateLiabilityAmountRequest data)
        {
            // Validate the contents of the request object before proceeding.
            var parsedCurrency = IsValidCurrency(data.Currency);
            IsLineItemIdInRange(data.LiabilityId, "liability");
            IsValidAmount(data.NewAmount);

            try
            {
                // Main business logic
                var balanceSheet = this.BalanceSheetManager.UpdateLiabilityAmount(data.LiabilityId, data.NewAmount, parsedCurrency);

                // Convert to response object
                return new UpdateLiabilityAmountResponse()
                {
                    LiabilityId = data.LiabilityId,
                    NewAmount = data.NewAmount,
                    NewLiabilityTotal = balanceSheet.TotalLiabilities,
                    NewNetWorth = balanceSheet.NetWorth,
                };
            }
            catch (Exception e)
            {
                throw new HttpResponseException()
                {
                    Status = HttpStatusCode.InternalServerError,
                    Value = e.Message
                };
            }
        }

        private Currency IsValidCurrency(string currency)
		{
            Currency parsedCurrency;

            if (!Enum.TryParse(currency, true, out parsedCurrency))
            {
                throw new HttpResponseException()
                {
                    Status = HttpStatusCode.BadRequest,
                    Value = "Unsupported currency was found."
                };
            }

            return parsedCurrency;
        }

        private bool IsValidAmount(decimal amount)
		{
            if (amount < 0 || amount > NetWorthConsts.MAX_AMOUNT)
            {
                throw new HttpResponseException()
                {
                    Status = HttpStatusCode.BadRequest,
                    Value = "Entered amount must be between 0 and 1,000,000,000,000."
                };
            }

            return true;
        }

        private bool IsLineItemIdInRange(int id, string type)
		{
            if (id < 1)
            {
                throw new HttpResponseException()
                {
                    Status = HttpStatusCode.BadRequest,
                    Value = $"Prospective {type} Id must be greater than 1."
                };
            }

            return true;
        }
    }
}
