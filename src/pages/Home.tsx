import { Card } from "primereact/card";
import InputTransaction from "../components/InputTransaction";
import MonthlyGraph from "../components/MonthlyGraph";
import TransactionHistory from "../components/TransactionHistory";
import BalanceDisplay from "../components/BalanceDisplay";

export default function Home() {
   return (<>
      <main>
         
         
      <div className="flex flex-wrap justify-content-end ">
      
      
      
      <div className="flex flex-wrap justify-content-between bg-red-200 w-full  p-1 mb-2 ">
         <Card className=" flex  mb-3 mt-4 ml-3">
            <BalanceDisplay />
            <InputTransaction/>
         </Card>
         <aside>
            <MonthlyGraph/>
         </aside>
      </div>

         </div>
         
         <TransactionHistory/>
      </main>
   </>)
}
