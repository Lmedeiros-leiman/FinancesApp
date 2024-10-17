import { useContext, useEffect, useState } from "react";
import { Transaction } from "../Data/Types/Transaction";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Database, DatabaseStores } from "../Data/Database";
import InputTransaction from "./InputTransaction";
import { Skeleton } from "primereact/skeleton";
import { GlobalDataContext, GlobalDataContextType } from "../Data/Contexts/GlobalDataContext";



export const TransactionHistory: React.FC = () => {
   const context = useContext(GlobalDataContext) as GlobalDataContextType

   const [orderedData, setOrderedData] = useState<Transaction[]>(context.data.Finances);
   useEffect(() => {
      setOrderedData(context.data.Finances.sort((a, b) => b.dateTime - a.dateTime))
   }, [context.data.Finances]);

   
   if (orderedData.length == 0) {
      return ( <div className="flex justify-content-center">
         <EmptyHistory />
      </div>)
   }
   

   return (<>
      {
         context.data.FetchingFinanceData ?
            Array(5).fill(0).map((_, index) => <PlaceholderCard key={index} />) :
            // shows the actual data
            <div className="flex flex-grow-1 relative justify-content-center gap-2 flex-wrap  w-full">
               {orderedData.length > 0 && orderedData.map((transaction: Transaction, index) => (
                  <TransactionCard transaction={transaction} key={index} />
               ))}
            </div>
      }
   </>);
}
export default TransactionHistory


const TransactionCard: React.FC<{ transaction: Transaction }> = (props): JSX.Element => {
   const [busy, setBusy] = useState(false);
   const context = useContext(GlobalDataContext) as GlobalDataContextType;

   const { transaction } = props;
   const formater = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: transaction.ammountType
   });

   const backgroundColor = transaction.type == "Expense" ? "bg-red-200" : "bg-green-200"
   const textColor = transaction.type == "Expense" ? "text-red-500" : "text-green-500"
   const icon = transaction.type == "Expense" ? "pi pi-send" : "pi pi-dollar"
   const transactionTime = new Date(transaction.dateTime)

   return (
      <article className="flex gap-1 flex-wrap surface-ground p-2 shadow-3 border-round">
         <header className=" ">
            <i className={`  ${icon} ${backgroundColor} mx-auto border-round-3xl text-4xl p-2 `} />
            <div className="text-justify">
               <div> {transactionTime.toLocaleDateString()} </div>
               <div> {transactionTime.toLocaleTimeString()} </div>
            </div>

         </header>
         <section className=" text-justify px-1 sm:w-22rem sm:max-w-22rem">
            <h2 className={` m-0 max-w-20rem overflow-auto`}> {transaction.title} </h2>
            <h3 className={` font-bold ${textColor} m-0 mt-1`}>{formater.format(transaction.amount)}</h3>
         </section>
         <footer className=" flex sm:justify-content-start justify-content-end w-full sm:w-min sm:flex-column gap-1">
            <Button icon="pi pi-trash"
            severity="danger" disabled={busy} outlined onClick={async () => {
               setBusy(true)
               const db = await Database.getDB();
               const data = context.data.Finances


               db.delete(DatabaseStores.Finances, transaction.id)
               let indexToDelete = data.findIndex(t => t.id == transaction.id)
               context.UpdateData(prevData => ({
                  ...prevData,
                  Finances: data.filter((_, index) => index !== indexToDelete)
               }));

               setBusy(false)
            }}>
            </Button>
         </footer>
      </article>);
};

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
            <Skeleton className="w-5rem" />
            <Skeleton className="w-5rem" />
            <Skeleton className="w-5rem" />
         </footer>

      </Card>
   </>)
}
