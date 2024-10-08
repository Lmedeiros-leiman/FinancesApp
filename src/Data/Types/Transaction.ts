export type Transaction = {
   title : string;
   amount : number;
   // defaults to US Dollars.
   ammountType : string;
   type: string | null;
   category: string;
   dateTime: number;
   // gets added when the transaction is saved
   // for internal use only.
   id: string;
   createdAt: number;
}

