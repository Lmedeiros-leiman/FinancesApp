import { useContext, useEffect, useState } from "react";
import { Transaction } from "../../Data/Types/Transaction";
import { Card } from "primereact/card";
import InputTransaction from "../TransactionRelated/InputTransaction";
import { Skeleton } from "primereact/skeleton";
import TransactionCard from "./TransactionCard";
import { FinancesContext, FinancesContextType } from "../../Data/Contexts/FinancesContext";
import { Database } from "../../Data/Database/Database";



export const TransactionHistory: React.FC = () => {
   const finances = useContext(FinancesContext) as FinancesContextType

   const [orderedData, setOrderedData] = useState<Transaction[]>([]);

   useEffect(() => {
      const total = Object.entries(finances.data)
         //.filter( day => new Date(day).getTime() <= new Date(new Date().toDateString()).getTime())
        .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
        .flatMap(([_, transactions]) => transactions);
    
      setOrderedData(total);
    }, [finances.data]);
    
   if ( finances.busy == true ) {
      return (
         Array(5).fill(0).map((_, index) => <PlaceholderCard key={index} />)
      );
   }
   if (  (finances.busy == false) && Object.entries(finances.data).length == 0  ) {
      
      return (<div className="flex justify-content-center">
         <EmptyHistory />
      </div>)
   }

   

   return (<>
      <div className="flex flex-wrap relative justify-content-center gap-2  w-full">
         {orderedData.map( transaction => {
            const DeleteTransaction = async () => {
               const confirmation = confirm("Are you sure you want to delete this transaction?")
         
               if (confirmation) {
                  console.log("Deleting transaction...")
                  if (await Database.RemoveTransaction(transaction)) {
                     console.log("Transaction deleted!")
                     const day = new Date(transaction.dateTime).toDateString()
                     finances.setter((prevData) => ({
                        ...prevData,
                        [day] : [
                           ...(prevData[day].filter(t => t.createdAt !== transaction.createdAt) || []),]
                     }))
                  }
               }
            }
            const UpdateStoredList = async (updatedTransaction : Transaction) => {
               const originalData = transaction
               
               if (await Database.UpdateTransaction(originalData, updatedTransaction)) {
                  const originalKey = new Date(originalData.dateTime).toDateString()
                  const updatedKey = new Date(updatedTransaction.dateTime).toDateString()

                  finances.setter((prevData) => {
                     const FinalData = {...prevData}

                     // remove the original transaction if the dates are different.
                     if (originalKey !== updatedKey) {
                        FinalData[originalKey] = [
                           ...(prevData[originalKey].filter(t => t.createdAt !== originalData.createdAt) || []),
                        ]
                     }

                     // insert/update the updated transaction
                     FinalData[updatedKey] = [
                        ...(prevData[updatedKey] || []).filter(t => t.createdAt !== originalData.createdAt), // Prevent duplicates if keys are the same
                        updatedTransaction,
                     ];
                     return FinalData 
                  });

                  console.log("Transaction updated!")
               }
               


            }

            return (<TransactionCard transaction={transaction} key={transaction.createdAt}
                HandleDeletion={DeleteTransaction} HandleBlur={UpdateStoredList}  />)
         })}
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
   return (<Card className="  flex-grow-1 shadow-4 p-2" >
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

      </Card>)
}
