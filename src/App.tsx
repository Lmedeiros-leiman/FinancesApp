import GlobalContext from './Data/GlobalContext';
import Home from './pages/Home';
import { Transaction } from './Types/Transaction';

function App() {
  

  const GlobalData = {
    Finances: new Array<Transaction>,
  }

  return (<>
  <pre>
    {JSON.stringify(GlobalData, null, 2)}
  </pre>
    <GlobalContext.Provider value={GlobalContext}>
      <Home />
    </GlobalContext.Provider>
    </>)
}

export default App
