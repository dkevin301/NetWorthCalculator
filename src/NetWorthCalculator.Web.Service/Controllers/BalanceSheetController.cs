using System;
using Microsoft.AspNetCore.Mvc;
using NetWorthCalculator.Core.BalanceSheets;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NetWorthCalculator.Web.Service.Controllers
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

        // GET api/<BalanceSheetController>/5
        [HttpGet("{id}")]
        public decimal Get(int id)
        {
            this.BalanceSheetManager.UpdateCurrencyAsync();

            return 1;
        }

        // POST api/<BalanceSheetController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<BalanceSheetController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }
    }
}
