# **ExchangeRatesApi - Backend**

## **Technologies Used**
  **ASP.NET 8 C#**

ExchangeRatesApi provides real-time exchange rates for a variety of currencies, including USD, EUR, GBP, CNY, and ILS. 
Users can:
- **Retrieve the list of supported currencies**
- **Retrieve current exchange rates for a specified base currency**

# **ExchangeRatesApp - Frontend**

## **Technologies Used**
- **Vite**: Setting up a development server
- **React**: Building the UI components
- **@tanstack/react-table**: Managing and displaying tabular data
- **TypeScript**: Ensuring type safety and defining data structures
- **CSS**: Basic styling for the application

## **Project Structure**
- **src/**: Contains the main source code
  - **components/**: Includes UI components, such as `ExchangeRate.tsx`
  - **services/**: Contains service functions (e.g., `ExchangeRateService.ts`) to retrieve data from the backend API
  - **models/**: TypeScript definitions (e.g., `exchangeRate.ts`) that define data structures used in the application

## **Project Details**
- **Frontend**: Uses TanStack table to display exchange rates with sortable columns
- **Backend**: Uses a free API service to provide authentic exchange rate data instead of simulated rates

## **How It Works**
1. **Run the Application**: Start the development server by running the *`vite`* command
2. **Select a Base Currency**: Choose a base currency from the drop-down menu to fetch exchange rates for different target currencies
 ![image](https://github.com/ChanaBroner/ExchangeRate/assets/125824958/4e0e1c07-4962-402d-b7eb-3827a23fb671)

4. **View Exchange Rates**: A table of exchange rates relative to the selected currency will appear
   ![image](https://github.com/ChanaBroner/ExchangeRate/assets/125824958/2502e3d7-02bf-4440-a88e-40f055050bf5)

5. **Dynamic Sorting**: Click on the table headers to display dynamically sorted exchange rates
   ![image](https://github.com/ChanaBroner/ExchangeRate/assets/125824958/6675731c-dd79-49a0-82e6-f8691ff0d482)

   ![image](https://github.com/ChanaBroner/ExchangeRate/assets/125824958/93dae83f-c9c5-4fcf-a7ed-e6ad6bfc16c3)

