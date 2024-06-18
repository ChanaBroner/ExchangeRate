# **ExchangeRatesApi - Backend**

ExchangeRatesApi provides real-time exchange rates for a variety of currencies, including USD, EUR, GBP, CNY, and ILS. Users can:
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
1. **Run the Application**: Start the development server by running the Vite command
2. **Select a Base Currency**: Choose a base currency from the drop-down menu to fetch exchange rates for different target currencies
3. **View Exchange Rates**: A table of exchange rates relative to the selected currency will appear
4. **Dynamic Sorting**: Click on the table headers to display dynamically sorted exchange rates

## **Setup Instructions**
1. Ensure Node.js and npm are installed on your system
2. Install dependencies by running `npm install`
3. Start the development server with `npm run dev`
4. Access the application at `http://localhost:3000` in your web browser

## **Deployment**
1. Build the production-ready bundle using `npm run build`
2. Deploy the generated `dist/` folder to your preferred hosting service
