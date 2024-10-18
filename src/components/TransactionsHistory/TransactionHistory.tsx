import { useContext, useEffect, useState } from "react";
import { Transaction } from "../../Data/Types/Transaction";
import { Card } from "primereact/card";
import InputTransaction from "../InputTransaction";
import { Skeleton } from "primereact/skeleton";
import { GlobalDataContext, GlobalDataContextType } from "../../Data/Contexts/GlobalDataContext";
import TransactionCard from "./TransactionCard";



export const TransactionHistory: React.FC = () => {
   const context = useContext(GlobalDataContext) as GlobalDataContextType

   const [orderedData, setOrderedData] = useState<Transaction[]>(context.data.Finances);
   useEffect(() => {
      setOrderedData(context.data.Finances.sort((a, b) => b.dateTime - a.dateTime))
   }, [context.data.Finances]);


   if (orderedData.length == 0) {
      return (<div className="flex justify-content-center">
         <EmptyHistory />
      </div>)
   }
   if (context.data.FetchingFinanceData) {
      return (
         Array(5).fill(0).map((_, index) => <PlaceholderCard key={index} />)
      );
   }


   return (<>
      <div className="flex flex-grow-1 relative justify-content-center gap-2 flex-wrap  w-full">
         {orderedData.length > 0 && orderedData.map((transaction: Transaction, index) => (
            <TransactionCard transaction={transaction} key={index} />
         ))}
      </div>
   </>);
}
export default TransactionHistory


function EmptyHistory() {
   return (<Card className=" max-w-20rem p-2 text-lg">
      <section className="mb-3">new transactions will appear here.</section>
      <InputTransaction />
   </Card>)
}

function PlaceholderCard() {
   return (<>
      <Card className=" sm:col-4 col-12 shadow-4 p-1" >
         <article className="flex gap-3">
            <aside>
               <Skeleton className=" border-round-3xl h-3rem w-3rem mb-1" />
               <Skeleton className="w-5rem mb-1" />
               <Skeleton className="w-4rem mb-2" />
            </aside>
            <div className=" flex flex-column gap-2 pt-3 flex-grow-1">
               <Skeleton className="w-16rem h-2rem" />
               <Skeleton className="w-12rem " />
            </div>
         </article>
         <footer className="flex gap-2 align-items-center">
            <Skeleton className="w-2rem h-2rem border-round-3xl " />
            <Skeleton className="sm:w-5rem w-full" />
            <Skeleton className="sm:w-5rem w-full" />
            <Skeleton className="sm:w-5rem w-full" />
         </footer>

      </Card>
   </>)
}
