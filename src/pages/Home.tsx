import InputTransaction from "../components/InputTransaction";
import MonthlyGraph from "../components/MonthlyGraph";
import TransactionHistory from "../components/TransactionsHistory/TransactionHistory";
import BalanceDisplay from "../components/BalanceDisplay";


export default function Home() {
   return (<main className="relative w-full">
      
      <nav className=" mb-3 p-2 surface-ground shadow-3 w-full ">
         <div className=" flex justify-content-between align-content-center align-items-center">
            <BalanceDisplay />
            <InputTransaction/>
         </div>
      </nav>
      
      <div className="flex flex-wrap justify-content-center px-1">
         <header className=" flex-grow-1 w-full">
            <MonthlyGraph/>
         </header>
         
         <footer className="text-center flex mb-4 mt-5 flex-column w-full">
            <TransactionHistory/>
         </footer>
      </div>
   </main>)
}
