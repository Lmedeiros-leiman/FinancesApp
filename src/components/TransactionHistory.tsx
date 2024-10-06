import { useContext } from "react";
import { GlobalContext } from "../Data/GlobalContext";
import { Transaction } from "../Data/Types/Transaction";



export default function TransactionHistory() {

   const context = useContext(GlobalContext)

   return (<>
      {context.data.Finances && TransactionCard(context.data.Finances[0])}
</>)
}

export function TransactionCard(transaction: Transaction) {
   return (<section>
   </section>)
} 


