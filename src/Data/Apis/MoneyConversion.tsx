// utilizes fxratesapi for a currency conversion list.
// uses ts money to handle the rest.
// https://api.fxratesapi.com/latest

import { useContext } from "react";
import CacheStorage from "../Cache/CacheStorage";
import { Currency, GlobalDataContext, GlobalDataContextType } from "../Contexts/GlobalDataContext";

export interface MoneyConversionApiResponse {
   success: boolean;
   terms: string;
   privacy: string;
   timestamp: number;
   date: string;
   base: string;
   rates: { [key: string] : number };
 }
export interface MoneyConversionApiValidCurrencies {
   [code: string]: Currency;
}

export default class MoneyConversionApi {

   public static async getLatestRates(Base: string = "USD") {
      // gets the cached exchange rates.
      let data = await(await CacheStorage.get("rates", `https://api.fxratesapi.com/latest?base=${Base}`))?.json() as MoneyConversionApiResponse;
      
      if (data == undefined) {
         data = await (await fetch(`https://api.fxratesapi.com/latest?base=${Base}`)).json() as MoneyConversionApiResponse;

         if (data.success == false) {
            // we probably reached the rate limit.
            console.error("Failure trying to get exchange rates");
            console.log(data);
            return undefined;
         }

         // changes the timestamps to the specific minute the request was made.
         data.timestamp = new Date().getTime();
         data.date = new Date().toISOString();

         // 8 minutes cache.
         CacheStorage.add("rates", `https://api.fxratesapi.com/latest?base=${Base}`, data, 60 * 8);
      }
      
      return data;
   }

   public static async getValidCurrencies() {
      let data = await (await CacheStorage.get("currencies", "https://api.fxratesapi.com/currencies"))?.json();
      
      if (data == undefined) {
         data = await (await fetch("https://api.fxratesapi.com/currencies")).json() as MoneyConversionApiValidCurrencies;
         CacheStorage.add("currencies", "https://api.fxratesapi.com/currencies", data, 60 * 60 * 24 * 30);
      }

      return data as MoneyConversionApiValidCurrencies
   }

   public static async convert(from: Currency, to: Currency) {
      let context = useContext(GlobalDataContext) as GlobalDataContextType;
      while(context.data.FetchingExchangeData || context.data.Exchange == undefined) { 
         await new Promise(resolve => setTimeout(resolve, 10));
      }
      let data = context.data.Exchange;
      if (data.base) {

      }
   }
}