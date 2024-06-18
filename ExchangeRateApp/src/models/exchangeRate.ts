export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    CNY = 'CNY',
    ILS = 'ILS'
  }
  
  export interface ExchangeRate {
    targetCurrency: Currency;
    rate: number;
  }  