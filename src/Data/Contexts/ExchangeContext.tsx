import { createContext, useContext, useEffect, useState } from "react"
import { JsonFetcher } from "../WebFetcher/CachedFetcher"
import { Usercontext, UserContextType } from "./UserContext"



export const ExchangeContext = createContext<ExchangeContextType | null>(null)

export type ExchangeContextType = {
   data: MoneyExchangeRateResponse | undefined,
   setter: React.Dispatch<React.SetStateAction<any>>,
   busy: boolean
}

export interface MoneyExchangeRateResponse {
   success: boolean;
   terms: string;
   privacy: string;
   timestamp: number;
   date: string;
   base: string;
   rates: { [key: string] : number };
 }


const ExchangeContextProvider : React.FC<{children: React.ReactNode}> = ({children}) => {
   const userSettings = useContext(Usercontext) as UserContextType;
   const [exchangeRates, setExchangeRates] = useState<MoneyExchangeRateResponse | undefined>(undefined)
   const [busy, setBusy] = useState(true)
   
   useEffect( ()=> {
      (async () => {
         if (userSettings.busy) return;
         setBusy(true);
         let userBase = userSettings.data.BaseCurrency.code;
         // 8 minutes cache.
         const data = await JsonFetcher<MoneyExchangeRateResponse>(`https://api.fxratesapi.com/latest?base=${userBase}`, 60 * 8);
         if ((data as MoneyExchangeRateResponse).success == false ) {
            setExchangeRates(undefined);
         } else {
            setExchangeRates(data as MoneyExchangeRateResponse);
         }
         
         setBusy(false);
      })()
   },[userSettings.data.BaseCurrency])

   return (<ExchangeContext.Provider value={ {data: exchangeRates, setter: setExchangeRates, busy:busy } } >
      {children}
   </ExchangeContext.Provider>)

}


export default ExchangeContextProvider