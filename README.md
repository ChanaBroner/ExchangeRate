**ExchangeRatesApi - Backend**
ExchangeRatesApi provides real-time exchange rates for a variety of currencies, including USD, EUR, GBP, CNY and ILS. Users can:

Retrieve the list of supported currencies.
Retrieve current exchange rates for a specified base currency.

Overview of front-end applications
This front-end application allows users to interact with real-time exchange rate data:

Properties:
Select Base Currency: Select a base currency from the drop-down menu to fetch exchange rates for different target currencies.
Dynamic Sorting: Click on the table headers to display dynamically sorted exchange rates.
Technologies used:
Vite: Setting up a development server.
src/: Contains the main source code.
components/: includes UI components, such as ExchangeRate.tsx.
services/: Contains service functions (eg, ExchangeRateService.ts) to retrieve data from the backend API.
models/: TypeScript definitions (eg, exchangeRate.ts) that define data structures used in the application.
Project details
Frontend: Uses a TanStack table to display exchange rates with sortable columns.
Backend: Uses a free API service to provide authentic exchange rate data instead of simulated rates.
