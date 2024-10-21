import { createContext, useEffect, useState } from "react";
import MoneyConversionApi, { MoneyConversionApiResponse } from "../Apis/CurrencyRatesApi";
import { Transaction } from "../Types/Transaction";
import { Database, DatabaseStores } from "../Database";
import CacheStorage from "../Cache/CacheStorage";

export const GlobalDataContext = createContext<GlobalDataContextType | null>(null);

const GlobalDataProvider : React.FC<{children: React.ReactNode}> = ({ children }) => {

   const [data, ChangeData] = useState<IGlobalData>({
      Finances: [],
      FetchingFinanceData: true,
      Exchange: undefined,
      FetchingExchangeData: true,
      ValidCurrencies: {},
      FetchingCurrencies: true,
      User:{
         IsMobile: true,
         BaseCurrency: undefined,
      }

   });

   //
   // Helper functions

   // fetches exchange data from the api or localstorage.
   const FetchCurenciesApiData = async () => {
      const data = await MoneyConversionApi.getLatestRates();

      ChangeData((PrevData) => ({
         ...PrevData,
         Exchange: data,
         FetchingExchangeData: false,
      }));
   }

   // fetches finances data from the database.
   const FetchFinancesData = async () => {
      try {
         const db = await Database.getDB();
         console.log("Fetching finance data...");
         const financeData = await db.getAll(DatabaseStores.Finances);
 
         ChangeData((PrevData) => ({
            ...PrevData,
            Finances: financeData,
            FetchingFinanceData: false,
         }));
 
         db.close()
         console.log("Finance data loaded sucessfully.")
      } catch (err) {
         console.error(err);
         ChangeData((PrevData) => ({
            ...PrevData,
            Finances: [],
            FetchingFinanceData: false,
         }));
         console.error("Failed to fetch finance data.");
      }
   }
   const FetchValidCurrencies = async () => {
      const data = await MoneyConversionApi.getValidCurrencies();
      ChangeData((PrevData) => ({
         ...PrevData,
         ValidCurrencies: data,
         FetchingCurrencies: false,
      }));

   }
   const detectMobile = async () => {

      if ( 
         navigator.userAgent.match(/Windows/i) ||
         navigator.userAgent.match(/Linux/i) ||
         navigator.userAgent.match(/Mac OS/i)
         ){
            ChangeData((PrevData) => ({
               ...PrevData,
               User: {
                  ...PrevData.User,
                  IsMobile: false
               }
            }));
         }
   }
   const DetectUserCurrency = async () => {
      const userLocale = navigator.language || "en-US";
      
      let data = await CacheStorage.get("UserCurrency", `./locales/${userLocale}/currency.json`);
      // we attempt to fetch the data from the cache first, if its not present we fetch it from the web.
      if (!data) {
         try {
            // fetches data from the public folder.
            console.log("Fetching user locale data from the web...");
            const data = await (await fetch(`./locales/${userLocale}/currency.json`)).json();
            CacheStorage.add("UserCurrency",`./locales/${userLocale}/currency.json`,data, 60 * 60 * 24 * 30);

         } catch(error) {
            console.log("Something went wrong.")
            console.error(error)
         }

      }

      ChangeData((PrevData) => ({
         ...PrevData,
         User: {
            ...PrevData.User,
            BaseCurrency: data
         }
      }));

   }

   //
   //
   useEffect( () => {
      Promise.all([
         FetchFinancesData(),
         FetchCurenciesApiData(),
         detectMobile(),
         DetectUserCurrency(),
         FetchValidCurrencies()
      ]);
   },[]);


   return(<>
      <GlobalDataContext.Provider value={{ data:data, UpdateData: ChangeData }} >
         { children }
      </GlobalDataContext.Provider>
   </>);
};
export default GlobalDataProvider




//
// Types

export interface IGlobalData {
   User: UserType,
   Finances: Transaction[]
   FetchingFinanceData: boolean
   Exchange: MoneyConversionApiResponse | undefined
   FetchingExchangeData: boolean
   ValidCurrencies: {[code: string]: Currency},
   FetchingCurrencies: boolean,
   

}
export type GlobalDataContextType = {
   data: IGlobalData
   UpdateData: React.Dispatch<React.SetStateAction<IGlobalData>>
}

export type UserType = {
   IsMobile : boolean
   BaseCurrency : Currency | undefined
}

export type Currency = {
   code : string,
   name : string,
   decimal_digits : number,
   name_plural : string,
   rounding : number,
   symbol : string,
   symbol_native : string
}