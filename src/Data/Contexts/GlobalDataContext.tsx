import { createContext, useEffect, useState } from "react";
import MoneyConversionApi, { MoneyConversionApiResponse } from "../Apis/MoneyConversion";
import { Transaction } from "../Types/Transaction";
import { Database, DatabaseStores } from "../Database";

export const GlobalDataContext = createContext<GlobalDataContextType | null>(null);

const GlobalDataProvider : React.FC<{children: React.ReactNode}> = ({ children }) => {

   const [data, ChangeData] = useState<IGlobalData>({
      Finances: [],
      FetchingFinanceData: true,
      Exchange: undefined,
      FetchingExchangeData: true,
      User:{
         IsMobile: true,
         BaseCurrency: "USD",
      }

   });

   //
   // Helper functions

   // fetches exchange data from the api or localstorage.
   const FetchCurenciesApiData = async () => {
      const data = await new MoneyConversionApi().getLatestRates()
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

   //
   //
   useEffect( () => {
      Promise.all([
         FetchFinancesData(),
         FetchCurenciesApiData(),
         detectMobile(),
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



//
// Types

export interface IGlobalData {
   Finances: Transaction[]
   FetchingFinanceData: boolean
   Exchange: MoneyConversionApiResponse | undefined
   FetchingExchangeData: boolean
   User: UserType
   
}
export type GlobalDataContextType = {
   data: IGlobalData
   UpdateData: React.Dispatch<React.SetStateAction<IGlobalData>>
}

export type UserType = {
   IsMobile : boolean
   BaseCurrency : string
}