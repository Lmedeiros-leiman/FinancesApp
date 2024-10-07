import { useContext } from "react";
import { GlobalContext } from "../Data/GlobalContext";
import { Transaction } from "../Data/Types/Transaction";
import { Card } from "primereact/card";



export default function TransactionHistory() {
   const context = useContext(GlobalContext)

   return (<div className="flex gap-3 flex-wrap py-2 px-1">
      {context.data.Finances && context.data.Finances.map((transaction: Transaction) => (
         <TransactionCard transaction={transaction} key={transaction.id} />
      ))}
   </div>)
}

interface TransactionCardProps extends React.ComponentProps<any> {
   transaction: Transaction
}

export function TransactionCard(props: TransactionCardProps) {
   const { transaction } = props

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
