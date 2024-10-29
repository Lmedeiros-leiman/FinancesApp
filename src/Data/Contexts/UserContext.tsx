import { createContext, useEffect, useState } from "react";
import { Currency } from "./CurrencyContext";
import { JsonFetcher } from "../WebFetcher/CachedFetcher";


export const Usercontext = createContext<UserContextType | null>(null);

export type UserContextType = {
   data : UserConfig,
   setter : React.Dispatch<React.SetStateAction<UserConfig>>,
   busy : boolean,
}

export type UserConfig = {
   IsMobile: boolean
   BaseCurrency: Currency
   Settings: {
      AutoExchange: boolean
      ResetInputFormOnCancel: boolean
      ShowForms: boolean
      ShowValues: boolean
   }
}

export const FetchLocaleCurrency = async (locale: string) => await JsonFetcher(`./locales/${locale}/currency.json`,60 * 60 * 24 * 30) as Currency | undefined;


export const UserContextProvider : React.FC<{children: React.ReactNode}> = ({children}) => {

   const [userConfigs, setUserConfigs] = useState({
      IsMobile: true,
      BaseCurrency: { "code": "USD", "name": "US Dollar", "decimal_digits": 2, "name_plural": "US dollars", "rounding": 0, "symbol": "$", "symbol_native": "$" },
      Settings : {
         AutoExchange: localStorage.getItem("AutoExchange") ? false : true,
         ResetInputFormOnCancel: localStorage.getItem("ResetInputFormOnCancel") ? true : false,
         ShowForms: localStorage.getItem("ShowForms") ? true : false,
         ShowValues: localStorage.getItem("ShowValues") ? true : false,
      }
   });

   useEffect( () => {
      (async () => {
         if (
            navigator.userAgent.match(/Windows/i) ||
            navigator.userAgent.match(/Linux/i) ||
            navigator.userAgent.match(/Mac OS/i)) {
               setUserConfigs((prev) => ({...prev, IsMobile: false}))
            }// end if
            
            // fetches the user favorite currency or language default.
            const preferedCurrency = localStorage.getItem("PreferedCurrency");
            if (preferedCurrency) {

               setUserConfigs( (PrevData) => ({
                  ...PrevData,
                  BaseCurrency: JSON.parse(preferedCurrency) as Currency
                  }));
            } else {
               const userLocale = navigator.language || "en-US";
               let UserCurrencyData = await FetchLocaleCurrency(userLocale);
               setUserConfigs( (PrevData) => ({
                  ...PrevData,
                  BaseCurrency: UserCurrencyData as Currency
                  }));
            }

         

      })()
   },[])



   return (<Usercontext.Provider value={ {data: userConfigs, setter: setUserConfigs, busy: false} }>
      {children}
   </Usercontext.Provider>)
}
export default UserContextProvider;

/*
const PreferedCurrency = localStorage.getItem("PreferedCurrency") ?? null;

      if (PreferedCurrency) {
         let data = JSON.parse(PreferedCurrency) as Currency;
         ChangeData((PrevData) => ({
            ...PrevData,
            User: {
               ...PrevData.User,
               BaseCurrency: data
            }
         }));
      } else {
         const userLocale = navigator.language || "en-US";
         let UserCurrencyData = await FetchLocaleCurrency(userLocale);
         let exchangeRates = await MoneyConversionApi.getLatestRates(( UserCurrencyData as Currency).code);

         ChangeData((PrevData) => ({
            ...PrevData,
            Exchange: exchangeRates,
            FetchingExchangeData: false,
            User: {
               ...PrevData.User,
               BaseCurrency: UserCurrencyData as Currency
            }
         }));
      }
      */