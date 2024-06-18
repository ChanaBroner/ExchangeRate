using Newtonsoft.Json;

namespace ExchangeRatesApi.Models
{
    public class ExchangeRateResponse
    {
        public ExchangeRateResponse()
        {
            ConversionRates = new Dictionary<string, double>();
        }

        [JsonProperty("conversion_rates")]
        public Dictionary<string, double> ConversionRates { get; set; }
    }
}