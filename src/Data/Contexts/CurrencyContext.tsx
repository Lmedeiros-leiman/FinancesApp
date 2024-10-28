import { createContext, useEffect, useState } from "react";
import { JsonFetcher } from "../WebFetcher/CachedFetcher";

export type Currency = {
   code: string,
   name: string,
   decimal_digits: number,
   name_plural: string,
   rounding: number,
   symbol: string,
   symbol_native: string
}

export const CurrencyContext = createContext<CurrencyContextType | null>(null);

export type CurrencyContextType = {
   data: ApiCurrencies
   busy: boolean
   setter: React.Dispatch<React.SetStateAction<ApiCurrencies>>
}

export interface ApiCurrencies {
   [code: string]: Currency;
}


const CurrencyContextProvider : React.FC<{ children : React.ReactNode}> = ({children}) => {

   const [currencies, setCurrencies] = useState<ApiCurrencies>({});

   useEffect(() => {
      (async () => {
         let currencies = await JsonFetcher<ApiCurrencies>("https://api.fxratesapi.com/currencies", 60 * 60 * 24 * 30);
         setCurrencies(currencies);
      })()
   },[])

   return (<CurrencyContext.Provider value={ {data: currencies, setter: setCurrencies, busy: false} }>
      {children}
   </CurrencyContext.Provider>)
}
export default CurrencyContextProvider






