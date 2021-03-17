using NetWorthCalculator.Entities.Enums;

namespace NetWorthCalculator.Entities.Models
{
    public class Liability
    {
        public int Id { get; set; }

        public decimal Amount { get; set; }

        public string Description { get; set; }

        public LiabilityGroup Group { get; set; }

        public decimal IntervalAmount { get; set; }

        public int Order { get; set; }

        public PaymentInterval PaymentInterval { get; set; }
    }
}
