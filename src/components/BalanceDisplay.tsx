import { useContext, useEffect, useState } from "react"
import { InputText } from "primereact/inputtext"
import { Skeleton } from "primereact/skeleton"
import { Tooltip } from "primereact/tooltip"
import { FinancesContext, FinancesContextType } from "../Data/Contexts/FinancesContext"
import { Usercontext, UserContextType } from "../Data/Contexts/UserContext"
import { ExchangeContext, ExchangeContextType } from "../Data/Contexts/ExchangeContext"





export default function BalanceDisplay() {

   const finances = useContext(FinancesContext) as FinancesContextType
   const exchanges = useContext(ExchangeContext) as ExchangeContextType
   const userConfigs = useContext(Usercontext) as UserContextType

   const [total, setTotal] = useState(0);
   const [showingData, setShowingData] = useState<boolean>(userConfigs.data.Settings.ShowValues);

   useEffect( () => {
      const dates = Object.keys(finances.data).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
      const todayKey = new Date().toDateString()

      let calculatedTotal = 0;
      for (let i = 0; i < dates.length; i++) { 
         let currentDateKey = dates[i]
         
         //
         finances.data[currentDateKey].forEach(t => {
            const rates = exchanges.data

            if (rates) {
               if (t.ammountType.code === userConfigs.data.BaseCurrency.code) { 
                  calculatedTotal += t.amount
               } else {
                  calculatedTotal += t.amount / rates.rates[t.ammountType.code]
               }
            } else {
               calculatedTotal += t.amount
            }
            
            
         })

         if ( currentDateKey === todayKey) {
            setTotal(calculatedTotal);
            break;
         }
      }
      

   },[finances,exchanges,userConfigs.data.BaseCurrency]); 


   if (finances.busy || exchanges.busy) {
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
                  data-pr-tooltip={userConfigs.data.BaseCurrency.symbol + " | "+ userConfigs.data.BaseCurrency.symbol_native}
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