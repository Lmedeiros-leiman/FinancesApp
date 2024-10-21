import { useContext, useEffect, useState } from "react"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Skeleton } from "primereact/skeleton"
import { Currency, GlobalDataContext, GlobalDataContextType } from "../Data/Contexts/GlobalDataContext"



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
         <Button outlined className="m-0 px-2 py-1" icon=" "> { context.data.User.BaseCurrency?.symbol_native } </Button>
         <InputText readOnly value={String(calculatedTotal)} />
         <Button className="m-0 px-2 py-1" icon={ showingData ? "pi pi-eye-slash" : "pi pi-eye" } 
         onClick={() => setShowingData(!showingData)} />
      </span>
   </>);
}