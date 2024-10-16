import React, { useEffect, useState } from "react";
import { Transaction } from "./Types/Transaction";
import { Database, DatabaseStores } from "./Database";
import MoneyConversionApi, { MoneyConversionApiResponse } from "./Apis/MoneyConversion";


export const EmptyGlobalData: GlobalData = {
   Finances: [],
   FetchingFinanceData: true,
   //
   Exchange: undefined,
   FetchingExchangeData: true
}



export const useGlobalData = (): GlobalContext => {

   const [GlobalData, UpdateData] = useState<GlobalData>(EmptyGlobalData);

   // fetches finances data from the database.
   const FetchFinancesData = async () => {
      try {
         const db = await Database.getDB();
         console.log("Fetching finance data...");
         const financeData = await db.getAll(DatabaseStores.Finances);

         UpdateData((PrevData) => ({
            ...PrevData,
            Finances: financeData,
            FetchingFinanceData: false,
         }));

         db.close()
         console.log("Finance data loaded sucessfully.")
      } catch (err) {
         console.error(err);
         UpdateData((PrevData) => ({
            ...PrevData,
            Finances: [],
            FetchingFinanceData: false,
         }));
         console.error("Failed to fetch finance data.");
      }
   }

   // fetches exchange data from the api or localstorage.
   const FetchCurenciesApiData = async () => {
      const data = await new MoneyConversionApi().getLatestRates()
      UpdateData((PrevData) => ({
         ...PrevData,
         Exchange: data,
         FetchingExchangeData: false,
      }));
   }

   useEffect(() => {

      // fetch everything in parallel.
      Promise.all([
         FetchFinancesData(),
         FetchCurenciesApiData(),
      ]);
      

   }, []);

   return { data: GlobalData, UpdateData: UpdateData };
}
//
// context
//
export const GlobalContext = React.createContext<GlobalContext>({
   data: EmptyGlobalData,
   UpdateData: () => { console.warn("UpdateData called before context initialization.") }
});

//
// types
// 
export interface GlobalContext {
   data: GlobalData,
   UpdateData: React.Dispatch<React.SetStateAction<GlobalData>>
}

export interface GlobalData {
   Finances: Transaction[],
   FetchingFinanceData: boolean,
   //
   Exchange: MoneyConversionApiResponse | undefined,
   FetchingExchangeData: boolean

}