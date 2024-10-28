import { createContext, useEffect, useState } from "react";
import { Transaction } from "../Types/Transaction";
import { Database } from "../Database/Database";

export type FinancesContextType = {
   data: { [key: string]: Transaction[] }, 
   busy: boolean, setter: 
   React.Dispatch<React.SetStateAction<{ [key: string]: Transaction[] }>>};

export const FinancesContext = createContext<FinancesContextType | null>(null);

const FinacesContextProvider : React.FC<{children: React.ReactNode}>  = ({children}) => {

   const [finances, setFinances] = useState<{[key: string] : Transaction[] }>( {});
   const [busy, setBusy] = useState(true);

   useEffect(() => {
      ( async () => {
         setBusy(true)

         const data = await Database.GetTransactions();
         setFinances(data);

         setBusy(false)
      })()
   },[]);



   return(<FinancesContext.Provider value={ {data: finances, busy:busy ,setter: setFinances} }>
      {children}
   </FinancesContext.Provider>)
}

export default FinacesContextProvider;