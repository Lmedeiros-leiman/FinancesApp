import { useContext, useEffect, useState } from "react"
import { InputText } from "primereact/inputtext"
import { Skeleton } from "primereact/skeleton"
import { Tooltip } from "primereact/tooltip"
import { FinancesContext, FinancesContextType } from "../Data/Contexts/FinancesContext"
import { Usercontext, UserContextType } from "../Data/Contexts/UserContext"
import { ExchangeContext, ExchangeContextType } from "../Data/Contexts/ExchangeContext"
import { Transaction } from "../Data/Types/Transaction"





export default function BalanceDisplay() {

   const finances = useContext(FinancesContext) as FinancesContextType
   const exchangeRate = useContext(ExchangeContext) as ExchangeContextType
   const userConfigs = useContext(Usercontext) as UserContextType

   const [total, setTotal] = useState(0);
   const [showingData, setShowingData] = useState<boolean>(userConfigs.data.Settings.ShowValues);

   useEffect(() => {
      // data = {[key: string] : Transaction[] }
      let total = 0;
      Object.keys(finances.data)
      .filter( day => new Date(day).getTime() <= new Date(new Date().toDateString()).getTime())
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .forEach( (day) => {
         finances.data[day].forEach( (transaction : Transaction) => {

            if (transaction.ammountType == userConfigs.data.BaseCurrency) {
               total += transaction.amount
            } else {
               if (exchangeRate.data) {
                  total += transaction.amount / exchangeRate.data.rates[transaction.ammountType.code]
               }
            }
         });
      });
      setTotal(total);

      
   },[finances.data, exchangeRate.data, userConfigs.data.BaseCurrency]);


   if (finances.busy || exchangeRate.busy) {
      return (<>
         <span className="flex gap-1 align-items-center ">
            <Skeleton width="2rem" height="3rem" />
            <InputText value={"Loading..."} readOnly />
            <Skeleton width="3rem" height="3rem" />
         </span>
      </>)
   }


   return (<>
      <span className="flex gap-1">
         <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
               <Tooltip target=".custom-target-icon" />
               <i className="m-0 p-0 custom-target-icon"
                  data-pr-tooltip={` ${ userConfigs.data.BaseCurrency.name } (${userConfigs.data.BaseCurrency.symbol}) `} 
                  data-pr-position="bottom"
                  data-pr-at="right+5 bottom"
                  data-pr-my=""
                  >{ userConfigs.data.BaseCurrency?.symbol_native }</i>
            </span>
            <InputText readOnly value={ showingData ? String(total.toFixed(userConfigs.data.BaseCurrency.decimal_digits)) : "**********" } />
            <span className="p-inputgroup-addon">
               <i className={`pi ${!showingData ? "pi pi-eye-slash" : "pi pi-eye"} cursor-pointer `} 
               onClick={() => {
                  showingData ? localStorage.setItem("showValues", "1") : localStorage.removeItem("showValues");
                  setShowingData( !showingData )
                  
                  userConfigs.setter( (PrevData) => ({
                     ...PrevData,
                     Settings: {
                        ...PrevData.Settings,
                        ShowValues: !showingData
                     }
                  }));
                  
               }} />
            </span>
         </div>
         
      </span>
   </>);
}