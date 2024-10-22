import { useContext, useEffect, useState } from "react"
import { InputText } from "primereact/inputtext"
import { Skeleton } from "primereact/skeleton"
import { Currency, GlobalDataContext, GlobalDataContextType } from "../Data/Contexts/GlobalDataContext"
import { Tooltip } from "primereact/tooltip"




export default function BalanceDisplay() {
   const context = useContext(GlobalDataContext) as GlobalDataContextType

   const [calculatedTotal, setCalculatedTotal] = useState(0);
   const [showingData, setShowingData] = useState(true);

   const UserCurrency = context.data.User.BaseCurrency as Currency;

   useEffect(() => {
      // calculates the user current balance.
      const calculateTotal = () => {
         if (context.data.FetchingFinanceData || (context.data.FetchingExchangeData)) { return; }
         if (context.data.User.BaseCurrency === undefined) { return; }
         //
         const ExchangeRates = context.data.Exchange;

         const value = context.data.Finances.reduce((prevData, currData) => {
            // if the transaction happened INBETWEEN the selected timeframe limit.
            // for now its just if it happened before today's timestamp.
            if (currData.dateTime < new Date().getTime()) {
               // check if the exchange rates are available.
               if (ExchangeRates?.rates != undefined) {
                  // check if the currency is the same as the user base currency.
                  if (currData.ammountType.code != UserCurrency.code) {
                     currData.amount = ExchangeRates.rates[currData.ammountType.code] * currData.amount
                  }
               }

               // we add the ammount even if its not the same as the user base currency.
               // probably should turn that into an user config option.
               prevData += currData.amount;
            }
            return prevData
         }, 0);

         setCalculatedTotal(value);
      }

      calculateTotal();

   }, [context.data.Finances, context.data.Exchange, context.data.User.BaseCurrency]);


   if (context.data.FetchingFinanceData) {
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
                  data-pr-tooltip={context.data.User.BaseCurrency?.name + " | "+ context.data.User.BaseCurrency?.symbol_native}
                  data-pr-position="bottom"
                  data-pr-at="right+5 bottom"
                  data-pr-my=""
                  >{ context.data.User.BaseCurrency?.symbol_native }</i>
            </span>
            <InputText readOnly value={ showingData ? String(calculatedTotal) : "**********" } />
            <span className="p-inputgroup-addon">
               <i className={`pi ${!showingData ? "pi pi-eye-slash" : "pi pi-eye"} cursor-pointer `} 
               onClick={() => setShowingData(!showingData)} />
            </span>
         </div>
         
         
      </span>
   </>);
}