import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Data/GlobalContext";
import { Transaction } from "../Data/Types/Transaction";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Database, DatabaseStores } from "../Data/Database";



export default function TransactionHistory() {
   const context = useContext(GlobalContext)
   const loading = context.data.FetchingFinanceData

   if (loading) {
      return (<>
         <div>
            Loading...
         </div>
      </>)
   }

   const [orderedData, setOrderedData] = useState<Transaction[]>(context.data.Finances);
   useEffect(() => {
      setOrderedData(context.data.Finances.sort((a, b) => b.dateTime - a.dateTime))
   }, [context.data.Finances]);

   if (orderedData.length == 0) {
      return (<EmptyHistory />)
   }



   return (<div className="flex relative justify-content-center gap-3 flex-wrap py-2 px-1 w-full">
         {orderedData.length > 0 && orderedData.map((transaction: Transaction) => (
            <>
               <TransactionCard transaction={transaction} key={transaction.id} />
            </>
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
               <header className="flex flex-column justify-content-start">
                  <i className={` ${icon} + ${backgroundColor} + border-round-3xl text-4xl p-2 `}></i>
                  
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
   return (<div>
      new transactions will appear here.
   </div>)
}

/*

function PlaceholderComponent() {
   function PlaceholderCard() {
      return (<Card className="max-w-20rem w-20rem shadow-2"
         title={
            <header>
               <div className={"flex gap-2 align-items-center"}>
                  <span><Skeleton width="4rem"></Skeleton></span>
                  <span className="border-left-1 text-sm font-normal pl-1"><Skeleton width="8rem"></Skeleton></span>
               </div>

            </header>
         }>

         <div className="font-bold flex justify-content-between">
            <span><Skeleton width="10rem"></Skeleton></span>
            <span className="text-sm font-light font-italic"><Skeleton width="4rem" ></Skeleton></span>
         </div>

      </Card>)
   }


   return (
      <div className="flex justify-content-center gap-3 mt-2 flex-wrap py-2 px-1">
         <PlaceholderCard key={window.crypto.randomUUID()} />
         <PlaceholderCard key={window.crypto.randomUUID()} />
         <PlaceholderCard key={window.crypto.randomUUID()} />
         <PlaceholderCard key={window.crypto.randomUUID()} />
         <PlaceholderCard key={window.crypto.randomUUID()} />
      </div>
   )
}

*/
