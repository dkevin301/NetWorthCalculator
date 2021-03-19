using System;
using System.Net;

namespace NetWorthCalculator.Web.Service.Exceptions
{
	public class HttpResponseException : Exception
    {
        public HttpStatusCode Status { get; set; }

        public object Value { get; set; }
    }
}
