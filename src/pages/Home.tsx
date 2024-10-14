import InputTransaction from "../components/InputTransaction";
import MonthlyGraph from "../components/MonthlyGraph";
import TransactionHistory from "../components/TransactionHistory";
import BalanceDisplay from "../components/BalanceDisplay";


export default function Home() {
   return (<main className="relative w-full">
      
      <nav className="mt-1 mb-2 mx-1 shadow-4 py-1 px-2 bg-white border-round">
         <div className=" flex justify-content-between align-content-center align-items-center">
            <BalanceDisplay />
            <InputTransaction/>
         </div>
      </nav>
      
      <div className="flex flex-wrap justify-content-center px-1">
         <header className=" flex-grow-1 w-full">
            <MonthlyGraph/>
         </header>
         
         <footer className="text-center flex mt-5 flex-column w-full">
            
            <TransactionHistory/>
         </footer>
      </div>
   </main>)
}
