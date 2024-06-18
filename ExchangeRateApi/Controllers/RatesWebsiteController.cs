using Microsoft.AspNetCore.Mvc;
using ExchangeRatesApi.Models;
using Newtonsoft.Json;

namespace ExchangeRatesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatesWebsiteController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string apiKey = "08e566fc14b3893d851fd8e3";
        private readonly string apiUrl = "https://v6.exchangerate-api.com/v6/";

        public RatesWebsiteController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        private async Task<List<ExchangeRate>> FetchExchangeRatesAsync(Currency baseCurrency)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"{apiUrl}{apiKey}/latest/{baseCurrency}");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var exchangeRateData = JsonConvert.DeserializeObject<ExchangeRateResponse>(content);

                if (exchangeRateData != null && exchangeRateData.ConversionRates != null)
                {
                    var exchangeRates = new List<ExchangeRate>();

                    foreach (var kvp in exchangeRateData.ConversionRates)
                    {
                        if (Enum.TryParse(typeof(Currency), kvp.Key, true, out var targetCurrency))
                        {
                            if ((Currency)targetCurrency != baseCurrency)
                            {
                                exchangeRates.Add(new ExchangeRate
                                {
                                    TargetCurrency = (Currency)targetCurrency,
                                    Rate = kvp.Value
                                });
                            }
                        }
                        else
                        {
                            Console.WriteLine($"Unsupported currency code: {kvp.Key}. Skipping...");
                        }
                    }

                    return exchangeRates;
                }
                else
                {
                    throw new InvalidOperationException("Failed to fetch exchange rates or conversion rates are null.");
                }
            }
            else if ((int)response.StatusCode == 500) // Handle 500 Internal Server Error
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Failed to fetch exchange rates. Status code: {response.StatusCode}. Error content: {errorContent}");
            }
            else
            {
                throw new HttpRequestException($"Failed to fetch exchange rates. Status code: {response.StatusCode}");
            }
        }


        [HttpGet("{currency}")]
        public async Task<ActionResult<List<ExchangeRate>>> GetExchangeRates(Currency currency)
        {
            var rates = await FetchExchangeRatesAsync(currency);

            if (rates != null)
            {
                return Ok(rates);
            }

            return NotFound();
        }

        [HttpGet("currencies")]
        public ActionResult<List<string>> GetCurrencies()
        {
            var currencies = Enum.GetNames(typeof(Currency)).ToList();
            return Ok(currencies);
        }
    }
}

/* Code without the use of a free API service */

/*using Microsoft.AspNetCore.Mvc;
using ExchangeRatesApi.Models;

namespace ExchangeRatesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatesWebsiteController : ControllerBase
    {
        private static readonly Dictionary<Currency, double> exchangeRates = new Dictionary<Currency, double>
        {
            { Currency.USD, 3.6930 },
            { Currency.EUR, 3.9939 },
            { Currency.GBP, 4.7201 },
            { Currency.CNY, 0.5100 },
            { Currency.ILS, 1 }
        };

        private static List<ExchangeRate> CreateExchangeRates(Currency baseCurrency)
        {
            return exchangeRates
                .Where(kvp => kvp.Key != baseCurrency)
                .Select(kvp => new ExchangeRate { TargetCurrency = kvp.Key, Rate = exchangeRates[baseCurrency] / kvp.Value })
                .ToList();
        }

        [HttpGet("{currency}")]
        public ActionResult<List<ExchangeRate>> GetExchangeRates(Currency currency)
        {
            if (exchangeRates.ContainsKey(currency))
            {
                var rates = CreateExchangeRates(currency);
                return Ok(rates);
            }
            return NotFound();
        }

        [HttpGet("currencies")]
        public ActionResult<List<string>> GetCurrencies()
        {
            var currencies = Enum.GetNames(typeof(Currency)).ToList();
            return Ok(currencies);
        }
    }
}*/
