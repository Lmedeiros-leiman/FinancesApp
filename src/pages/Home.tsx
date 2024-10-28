import InputTransaction from "../components/InputTransaction";
import TransactionHistory from "../components/TransactionsHistory/TransactionHistory";
import BalanceDisplay from "../components/BalanceDisplay";
import DataRangeResume from "../components/DataRangeResume";


export default function Home() {
   return (<main className="relative w-full">
      
      <nav className=" mb-1 p-2 surface-ground shadow-3 w-full ">
         <div className=" flex justify-content-between align-content-center align-items-center">
            <BalanceDisplay />
            <InputTransaction/>
         </div>
      </nav>
      
      <article className="flex flex-wrap justify-content-center px-1">
         <section className=" flex-grow-1 p-1 w-full">
            <DataRangeResume/>
         </section>
         
         <footer className="text-center flex mb-4 mt-5 flex-column w-full">
            <TransactionHistory/>
         </footer>
      </article>
   </main>)
}
