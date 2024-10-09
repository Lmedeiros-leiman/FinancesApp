import React, { useContext } from "react";
import { GlobalContext } from "../Data/GlobalContext";
import { Transaction } from "../Data/Types/Transaction";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";



export default function TransactionHistory() {
   const context = useContext(GlobalContext)
   
   const loading = context.data.FetchingFinanceData

   if (loading) {
      return (<PlaceholderComponent/>)
   }

   return (<div className="flex justify-content-center gap-3 flex-wrap py-2 px-1">
      {context.data.Finances && context.data.Finances.map((transaction: Transaction) => (
         <TransactionCard transaction={transaction} key={transaction.id} />
      ))}
   </div>)
}



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


   return( 
      <div className="flex justify-content-center gap-3 mt-2 flex-wrap py-2 px-1">
         <PlaceholderCard key={window.crypto.randomUUID()} />
         <PlaceholderCard key={window.crypto.randomUUID()} />
         <PlaceholderCard key={window.crypto.randomUUID()} />
         <PlaceholderCard key={window.crypto.randomUUID()} />
         <PlaceholderCard key={window.crypto.randomUUID()} />
      </div>
   )
}

function TransactionCard({ transaction }: { transaction: Transaction } & React.ComponentProps<any>) {
   
   const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: transaction.ammountType }).format(transaction.amount);

   const backgroundColor = transaction.type == "Expense" ? "bg-red-200" : "bg-green-200"
   const textColor = transaction.type == "Expense" ? "text-red-500" : "text-green-500"

   return (<Card className="max-w-20rem w-20rem shadow-2"
      title={
         <header>
            <div className={"flex gap-2 align-items-center"}>
               <span className={textColor + " " + backgroundColor + " px-3 py-1 border-round-3xl"}>{transaction.type}</span>
               <span className="border-left-1 text-sm font-normal pl-1">{transaction.title}</span>
            </div>
            
         </header>
      }>
      
      <div className="font-bold flex justify-content-between">
         <span className={ textColor + " " + backgroundColor +  " border-round-left-3xl text-lg px-2 flex-wrap"}>{currency}</span>
         <span className="text-sm font-light font-italic">{new Date(transaction.dateTime).toLocaleDateString()} </span>
      </div>
      
   </Card>)
}
