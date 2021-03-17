using NetWorthCalculator.Entities.Enums;

namespace NetWorthCalculator.Entities.Models
{
    public class Asset
    {
        public int Id { get; set; }

        public decimal Amount { get; set; }

        public string Description { get; set; }

        public AssetGroup Group { get; set; }

        public int Order { get; set; }
    }
}
