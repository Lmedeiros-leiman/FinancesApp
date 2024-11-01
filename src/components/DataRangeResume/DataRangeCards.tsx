import { useContext, useEffect, useState } from "react";
import { Usercontext, UserContextType } from "../../Data/Contexts/UserContext";
import { ExchangeContext, ExchangeContextType, MoneyExchangeRateResponse } from "../../Data/Contexts/ExchangeContext";
import { FinancesContext, FinancesContextType } from "../../Data/Contexts/FinancesContext";


const DataRangeCards: React.FC<{
   TimeRange: Date[]
}> = (props) => {
   const userSettings = useContext(Usercontext) as UserContextType;
   const finances = useContext(FinancesContext) as FinancesContextType;
   const exchange = useContext(ExchangeContext) as ExchangeContextType;

   const [Expenses, setExpenses] = useState(0);
   const [Income, setIncome] = useState(0);
   const [Total, setTotal] = useState(0);

   useEffect(() => {
      if (exchange.busy || finances.busy || userSettings.busy) return;
      const startDate = props.TimeRange[0];
      const endDate = props.TimeRange[1];
      const keys = Object.keys(finances.data);

      const AmmountUntilStartDate = (() => {
         return keys.filter(day => new Date(day) < startDate)
            .reduce((total, day) => {
               const dayTotal = finances.data[day].reduce((total, transaction) => {
                  if (!exchange.busy || exchange.data != undefined) {
                     if (transaction.ammountType.code != userSettings.data.BaseCurrency.code) {
                        return total + transaction.amount / (exchange.data as MoneyExchangeRateResponse).rates[transaction.ammountType.code];
                     }
                  }
                  return total + transaction.amount;
               }, 0);
               return total + dayTotal;
            }, 0);
      })();

      let expenses = 0;
      let total = AmmountUntilStartDate;
      let income = 0;
      for (let currentDate = new Date(startDate); currentDate.getTime() <= endDate.getTime(); currentDate.setDate(currentDate.getDate() + 1)) {

         (finances.data[currentDate.toDateString()] || []).forEach(transaction => {
            let ammount = transaction.amount;
            if (transaction.ammountType.code != userSettings.data.BaseCurrency.code) {
               ammount = transaction.amount / (exchange.data as MoneyExchangeRateResponse).rates[transaction.ammountType.code];

            }

            if (transaction.amount < 0) {
               expenses += Math.abs(ammount);
            } else {
               income += ammount;
            }
            total += ammount;
         })
      }

      setExpenses(expenses);
      setIncome(income);
      setTotal(total);


   }, [exchange.data, finances.data, userSettings.data, props.TimeRange]);


   return (<section className="flex w-full gap-4 text-center text-base">
      <span className="flex-grow-1 bg-red-400 overflow-auto w-full border-round">

         <h2 className="flex gap-1 justify-content-center">
            {userSettings.data.Settings.ShowValues ? <>
               <span>{(Expenses).toFixed(userSettings.data.BaseCurrency.decimal_digits)}</span>
               <span className="select-none">{userSettings.data.BaseCurrency.symbol_native}</span></>
               : (<strong>*********</strong>)
            }
         </h2>
         <strong className="select-none">Expenses</strong>
      </span>
      <span className="flex-grow-1  bg-gray-400 overflow-auto w-full border-round">

         <h2 className="flex gap-1 justify-content-center">
         {userSettings.data.Settings.ShowValues ? <>
            <span>{(Total).toFixed(userSettings.data.BaseCurrency.decimal_digits)}</span>
            <span className="select-none">{userSettings.data.BaseCurrency.symbol_native}</span> </>
            : (<strong>*********</strong>)}
         </h2>
         <strong className="select-none">Total</strong>
      </span>
      <span className="flex-grow-1 bg-green-400 overflow-auto w-full border-round">

         <h2 className="flex gap-1 justify-content-center">
         { userSettings.data.Settings.ShowValues ? <>
            <span>{(Income).toFixed(userSettings.data.BaseCurrency.decimal_digits)}</span>
            <span className="select-none">{userSettings.data.BaseCurrency.symbol_native}</span></>
            : (<strong>*********</strong>)}
         </h2>
         <strong className="select-none">Income</strong>
      </span>
   </section>);
}
export default DataRangeCards
