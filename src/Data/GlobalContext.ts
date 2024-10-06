import React, { useEffect, useState } from "react";
import { Transaction } from "./Types/Transaction";
import { Database, DatabaseStores } from "./Database";


export const  useGlobalData = () : GlobalContext => {
   
   const [GlobalData, UpdateData] = useState<GlobalData>({
      Finances: [],
      FetchingFinanceData: false,
   });


   useEffect(() => {
      const fetchFinanceData = async () => {
         try {
            console.log("Fetching finance data...")
            UpdateData(prevData => ({
               ...prevData, FetchingFinanceData: true,
            }));

            const db = await Database.getDB();
            const financeData = await db.getAll(DatabaseStores.Finances);

            UpdateData({
               Finances: financeData,
               FetchingFinanceData: false,
            });

            db.close();
            console.log("Finance data loaded.")
         } catch (err) {
            console.error(err);
            UpdateData(prevData => ({
               ...prevData,
               FetchingFinanceData: false,
            }))
         }
      }


      fetchFinanceData();
   }, []);

   return { data:GlobalData, UpdateData: UpdateData };
}
//
// context
//
export const GlobalContext = React.createContext<GlobalContext>({
   data: {
      Finances: [],
      FetchingFinanceData: true,
   },
   UpdateData: () => {},
})

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

}