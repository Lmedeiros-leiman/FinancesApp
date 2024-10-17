import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'

import Sidebar from './layout/Sidebar.tsx'

import "./styles/main.css"
import "primeflex/primeflex.min.css"
import "primeicons/primeicons.css"
import GlobalDataProvider from './Data/Contexts/GlobalDataContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App/>
    </PrimeReactProvider>
  </StrictMode>,
);


export function App() {

  (document.getElementById("mainStyle") as HTMLLinkElement).href  = `./node_modules/primereact/resources/themes/${ localStorage.getItem("theme") || "saga-blue" }/theme.css`;


  return (<>
    <GlobalDataProvider>
      <Sidebar />
    </GlobalDataProvider>
  </>)
}
