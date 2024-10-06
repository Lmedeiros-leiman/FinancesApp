import { useGlobalData, GlobalContext } from './Data/GlobalContext';
import Home from './pages/Home';


function App() {
  const {data, UpdateData} = useGlobalData()

  return (<>
    <div className='bg-red-200 p-2'>
      <header className='shadow-3 p-2 w-min'>Debuger.</header>
      <section>
        <pre>
          <div className='text-green-400 font-bold text-xl'>Global Data</div>
          { JSON.stringify(data, null, 2) }
        </pre>
      </section>
    </div>
    
    <GlobalContext.Provider value={{data, UpdateData}}  >
      <Home />
    </GlobalContext.Provider>
  </>)
}

export default App
