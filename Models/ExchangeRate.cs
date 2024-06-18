namespace ExchangeRatesApi.Models
{
    public class ExchangeRate
    {
        public Currency TargetCurrency { get; set; }
        public double Rate { get; set; }
    }
}