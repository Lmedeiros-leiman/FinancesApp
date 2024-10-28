import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'

import Sidebar from './layout/Sidebar.tsx'

import "./styles/main.css"
import "primeflex/primeflex.min.css"
import "primeicons/primeicons.css"
import GlobalDataProvider from './Data/Contexts/GlobalDataContext.tsx'
import FinacesContextProvider from './Data/Contexts/FinancesContext.tsx'
import UserContextProvider from './Data/Contexts/UserContext.tsx'
import ExchangeContextProvider from './Data/Contexts/ExchangeContexts.tsx'
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
      <ExchangeContextProvider>
        <FinacesContextProvider>
          <GlobalDataProvider>
            <Sidebar />
          </GlobalDataProvider>
        </FinacesContextProvider>
      </ExchangeContextProvider>
    </UserContextProvider>

  </>)
}
