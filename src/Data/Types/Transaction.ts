import { Currency } from "../Contexts/CurrencyContext";


export type Transaction = {
   title : string;
   amount : number;
   // defaults to US Dollars.
   ammountType : Currency;
   type: string | null;
   category: string;
   dateTime: number;
   // gets added when the transaction is saved
   // for internal use only.
   createdAt: number;
}

