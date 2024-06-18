import React, { useEffect, useMemo, useState } from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { getExchangeRates, getCurrencies } from '../services/ExchangeRateService';
import type { Currency, ExchangeRate } from '../models/exchangeRate';
import './ExchangeRate.css';

const columnHelper = createColumnHelper<ExchangeRate>();

const ExchangeRate: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [baseCurrencies, setBaseCurrencies] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | ''>('');
  const [exchangeRatesCache, setExchangeRatesCache] = useState<{ [key: string]: ExchangeRate[] }>({});

/*
The number of base currencies determines how many unique requests we will need
to make to fetch the exchange rates of all possible base currencies.
Once we fetch exchange rates for a particular base currency, they are cached. 
Therefore, any subsequent requests for the same base currency will use the cache 
instead of making a new API call.
The maximum number of API calls will be equal to the number of unique base coins. 
This is because each base coin will only require one API call, 
regardless of the number of times the user selects it, thanks to caching.
*/

  useEffect(() => {
    // Fetch base currencies once when the component mounts
    fetchBaseCurrencies();
  }, []);

  const fetchBaseCurrencies = async () => {
    const currencies = await getCurrencies();
    setBaseCurrencies(currencies);
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = event.target.value as Currency;
    setSelectedCurrency(currency);
    // Check if exchange rates are already cached
    if (currency in exchangeRatesCache) {
      setExchangeRates(exchangeRatesCache[currency]);
    } else {
      fetchExchangeRates(currency);
    }
  };

  const fetchExchangeRates = async (currency: Currency) => {
    const rates = await getExchangeRates(currency);
    setExchangeRates(rates);
    // Cache the fetched rates
    setExchangeRatesCache({ ...exchangeRatesCache, [currency]: rates });
  };

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'baseCurrency',
        header: 'Base',
        cell: () => selectedCurrency,
      }),
      columnHelper.accessor('targetCurrency', {
        header: 'Target',
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor('rate', {
        header: 'Exchange Rate',
        cell: (info) => info.getValue<number>().toFixed(4),
        sortingFn: 'alphanumeric',
      }),
    ],
    [selectedCurrency]
  );

  const data = useMemo(() => exchangeRates, [exchangeRates]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="exchange-rate-container">
      <div className="input-section">
        <label htmlFor="currency-select">Select a base currency</label>
        <select id="currency-select" value={selectedCurrency} onChange={handleCurrencyChange}>
          <option value="" disabled>
            Select a currency
          </option>
          {baseCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className="spacer"></div>

      {selectedCurrency && (
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽') : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExchangeRate;
