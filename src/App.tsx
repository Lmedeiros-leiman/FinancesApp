import { useGlobalData, GlobalContext } from './Data/GlobalContext';
import Home from './pages/Home';
import "./styles/main.css"

function App() {
  const {data, UpdateData} = useGlobalData()


  return (<>
    
    <GlobalContext.Provider value={{data, UpdateData}}  >
      <Home />
    </GlobalContext.Provider>
  </>)
}

export default App
