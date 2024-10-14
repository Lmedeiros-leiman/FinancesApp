import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'

import { GlobalContext, useGlobalData } from './Data/GlobalContext.ts'
import Sidebar from './layout/Sidebar.tsx'

import "./styles/main.css"
import "primeflex/primeflex.min.css"
import "primeicons/primeicons.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App/>
    </PrimeReactProvider>
  </StrictMode>,
)

export function App() {
  const {data, UpdateData} = useGlobalData();

  (document.getElementById("mainStyle") as HTMLLinkElement).href  = `./node_modules/primereact/resources/themes/${ localStorage.getItem("theme") || "saga-blue" }/theme.css`;


  return (<>
    <GlobalContext.Provider value={{data, UpdateData}}  >
      <Sidebar />
    </GlobalContext.Provider>
  </>)
}
