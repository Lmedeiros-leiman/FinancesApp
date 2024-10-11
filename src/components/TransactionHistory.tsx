import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Data/GlobalContext";
import { Transaction } from "../Data/Types/Transaction";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";



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

   }, []);




   return (<>
      <div className="flex justify-content-center gap-3 flex-wrap py-2 px-1">
         {context.data.Finances.length > 0 && context.data.Finances.map((transaction: Transaction) => (
            <TransactionCard transaction={transaction} key={transaction.id} />
         ))}
      </div>
   </>)
}


interface CardProps {
   transaction: Transaction
}

function TransactionCard(props: CardProps) {
   const { transaction } = props;
   const formater = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: transaction.ammountType
   });

   const backgroundColor = transaction.type == "Expense" ? "bg-red-200" : "bg-green-200"
   const textColor = transaction.type == "Expense" ? "text-red-500" : "text-green-500"
   const icon = transaction.type == "Expense" ? "pi pi-send" : "pi pi-dollar"
   return (<>
      <Card className=" sm:col-4 col-10 shadow-4 p-1" key={transaction.id}>
         <article className="flex flex-column justify-content-between xl:flex-row xl:align-items-start p-0 gap-3">
            <div className="flex gap-3">
               <header className="flex flex-column ">
               <i className={` ${icon} + ${backgroundColor} + border-round-3xl text-4xl p-2 `}></i>
               
                  <div>
                     {new Date(transaction.dateTime).toLocaleDateString()}
                  </div>
                     <div className="flex align-items-center gap-3">
                        <span className="flex align-items-center gap-2">
                           <i className="pi pi-tag"></i>
                           <span className="font-semibold">{transaction.category}</span>
                        </span>
                     </div>
               </header>
               
               <section className="flex flex-column flex-wrap justify-content-start text-justify gap-0">
                  <h2 className="text-2xl font-bold text-900 flex-wrap m-0"> {transaction.title} </h2>
                  <div className={` font-bold ${textColor}`}>{formater.format(transaction.amount)}</div>
               </section>
            </div>

            <footer className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
               
               <Button severity="danger" outlined>
                  <i className="pi pi-trash "></i>
               </Button>
            </footer>
         </article>
      </Card>
   </>)
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

function TransactionCardOld({ transaction }: { transaction: Transaction } & React.ComponentProps<any>) {

   const data = useContext(GlobalContext).data.Finances

   const formater = new Intl.NumberFormat(navigator.language,
      {
         style: 'currency',
         currency: transaction.ammountType
      });

   

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
         <span className={textColor + " " + backgroundColor + " border-round-left-3xl text-lg px-2 flex-wrap"}>{currency}</span>
         <span className="text-sm font-light font-italic">{new Date(transaction.dateTime).toLocaleDateString()} </span>
      </div>

   </Card>)
}
