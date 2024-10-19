import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'

import Sidebar from './layout/Sidebar.tsx'

import "./styles/main.css"
import "primeflex/primeflex.min.css"
import "primeicons/primeicons.css"
import GlobalDataProvider from './Data/Contexts/GlobalDataContext.tsx'
//import { AvailableThemes } from './Data/Selections/AvailableThemes.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App/>
    </PrimeReactProvider>
  </StrictMode>,
);


export function App() {
  
  //
  return (<>
    <GlobalDataProvider>
      <Sidebar />
    </GlobalDataProvider>
  </>)
}
