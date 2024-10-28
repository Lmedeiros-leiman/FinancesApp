import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'

import Sidebar from './layout/Sidebar.tsx'

import "./styles/main.css"
import "primeflex/primeflex.min.css"
import "primeicons/primeicons.css"
import FinacesContextProvider from './Data/Contexts/FinancesContext.tsx'
import UserContextProvider from './Data/Contexts/UserContext.tsx'
import ExchangeContextProvider from './Data/Contexts/ExchangeContext.tsx'
import CurrencyContextProvider from './Data/Contexts/CurrencyContext.tsx'
//import { AvailableThemes } from './Data/Selections/AvailableThemes.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);


export function App() {

  //
  return (<>
    <UserContextProvider>
      <CurrencyContextProvider>
        <ExchangeContextProvider>
          <FinacesContextProvider>
            
              <Sidebar />
            
          </FinacesContextProvider>
        </ExchangeContextProvider>
      </CurrencyContextProvider>
    </UserContextProvider>

  </>)
}
