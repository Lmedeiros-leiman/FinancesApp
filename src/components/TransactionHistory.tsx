import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Data/GlobalContext";
import { Transaction } from "../Data/Types/Transaction";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Database, DatabaseStores } from "../Data/Database";
import InputTransaction from "./InputTransaction";
import { Skeleton } from "primereact/skeleton";



export default function TransactionHistory() {
   const context = useContext(GlobalContext)

   if (context.data.FetchingFinanceData) {
      return (<>
         <div className="flex relative justify-content-center gap-3 flex-wrap py-2 px-1 w-full">
            { Array(5).fill(0).map((_,index) => <PlaceholderCard key={index} /> )}
         </div>
      </>)
   }

   const [orderedData, setOrderedData] = useState<Transaction[]>(context.data.Finances);
   useEffect(() => {
      setOrderedData(context.data.Finances.sort((a, b) => b.dateTime - a.dateTime))
   }, [context.data.Finances]);

   if (orderedData.length == 0) {
      return ( <div className="flex justify-content-center">
         <EmptyHistory />
      </div>)
   }



   return (<div className="flex relative justify-content-center gap-3 flex-wrap py-2 px-1 w-full">
         {orderedData.length > 0 && orderedData.map((transaction: Transaction, index) => (
               <TransactionCard transaction={transaction} key={index} />
         ))}
      </div>)
}


interface CardProps {
   transaction: Transaction
}

function TransactionCard(props: CardProps) {
   const [busy, setBusy] = useState(false)
   const context = useContext(GlobalContext)

   const { transaction } = props;
   const formater = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: transaction.ammountType
   });

   const backgroundColor = transaction.type == "Expense" ? "bg-red-200" : "bg-green-200"
   const textColor = transaction.type == "Expense" ? "text-red-500" : "text-green-500"
   const icon = transaction.type == "Expense" ? "pi pi-send" : "pi pi-dollar"
   const transactionTime = new Date(transaction.dateTime)

   return (<>
      <Card className=" sm:col-4 col-12 shadow-4 p-1" key={transaction.id}>
         <article className="flex flex-column justify-content-between xl:flex-row xl:align-items-start p-0 gap-3">
            <div className="flex gap-3">
               <header className="flex flex-column justify-content-start ">
                  <i className={` ${icon} + ${backgroundColor} mx-auto border-round-3xl text-4xl p-2 h-3 w-max`}></i>
                  
                  <div> {transactionTime.toLocaleDateString()} </div>
                  <div> {transactionTime.toLocaleTimeString()} </div>
                  
                  <span className="flex align-items-center align-content-center gap-2">
                     <i className="pi pi-tag"></i>
                     <span className="font-semibold">{transaction.category}</span>
                  </span>
                  
               </header>
               
               <section className="flex flex-column flex-wrap justify-content-start text-justify gap-0">
                  <h2 className="text-2xl font-bold text-900 flex-wrap m-0"> {transaction.title} </h2>
                  <div className={` font-bold ${textColor}`}>{formater.format(transaction.amount)}</div>
               </section>
            </div>

            <footer className="flex sm:flex-column align-items-center sm:align-items-end mt-2 sm:mt-0">
               
               <Button severity="danger" disabled={busy} outlined onClick={ async () => {
                  setBusy(true)
                  const db = await Database.getDB();
                  const data = context.data.Finances


                  db.delete(DatabaseStores.Finances, transaction.id)
                  let indexToDelete = data.findIndex(t => t.id == transaction.id)
                  context.UpdateData(prevData => ({
                     ...prevData,
                     Finances: data.filter( (_,index) => index !== indexToDelete)
                     
                  }));
                  

                  setBusy(false)
               }}>
                  <i className="pi pi-trash "></i>
               </Button>
            </footer>
            
         </article>
      </Card>
   </>)
}

function EmptyHistory() {
   return (<Card className=" max-w-20rem p-2 text-lg">
      <section className="mb-3">new transactions will appear here.</section>
      <InputTransaction/>
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
