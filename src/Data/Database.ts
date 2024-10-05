import { Transaction } from "../Types/Transaction";

export class Database {
   static UserTransactions : Transaction[] = [];

   static AddEntry(newEntry : Transaction) {

   }
   
   static GetEntries(table : string) {
   }

   static RemoveEntry(table : string, id : number) {}

   static UpdateEntry(table : string, id : number, newEntry : Transaction) {}

}