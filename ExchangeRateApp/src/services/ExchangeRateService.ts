import { ExchangeRate } from '../models/exchangeRate';

export async function getExchangeRates(currency: string): Promise<ExchangeRate[]> {
  try {
    const response = await fetch(`https://localhost:7069/api/RatesWebsite/${currency}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const rates: ExchangeRate[] = await response.json();
    return rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return [];
  }
}

export async function getCurrencies(): Promise<string[]> {
  try {
    const response = await fetch('https://localhost:7069/api/RatesWebsite/currencies');
    if (!response.ok) throw new Error('Network response was not ok');
    const currencies: string[] = await response.json();
    return currencies;
  } catch (error) {
    console.error('Error fetching currencies:', error);
    return [];
  }
}