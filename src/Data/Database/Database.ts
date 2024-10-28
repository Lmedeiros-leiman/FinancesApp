import { openDB } from "idb";
import { Transaction } from "../Types/Transaction";

export enum DatabaseStores {
   // the equivalent of a table.
   Finances = "Finances",
}


export class Database {
   public static readonly DatabaseName: string = "Finances";
   public static readonly DatabaseVersion: number = 2; // pre alpha2 :3

   private static async getDB() {
      return await openDB(Database.DatabaseName, Database.DatabaseVersion, {
         upgrade(db) {
            console.log("Updating database...")
            Object.keys(DatabaseStores).forEach(storeName => {
               db.createObjectStore(storeName); // finances table.
            });

            console.log("Database updated!")
         }
      });
   }

   public static async AddTransaction(newTransaction : Transaction) {
      const db = await Database.getDB();
      
      const key = new Date(newTransaction.dateTime).toDateString();
      
      const existingData = await db.get(DatabaseStores.Finances, key);
      if (existingData) {
         await db.put(DatabaseStores.Finances, [...existingData, newTransaction], key)
      } else {
         await db.add(DatabaseStores.Finances, [newTransaction], key)
      }
      
      db.close();
      return true;
   }
   public static async RemoveTransaction(targetTransaction : Transaction) {
      const db = await Database.getDB();
      const key = new Date(targetTransaction.dateTime).toDateString();

      const existingData = await db.get(DatabaseStores.Finances, key) as Transaction[] | undefined;
      if (existingData != undefined) {
         await db.put(DatabaseStores.Finances, existingData.filter(t => t.createdAt !== targetTransaction.createdAt), key)
      } else {
         return false;
      }

      db.close();
      return true;
   }
   public static async UpdateTransaction(originalTransaction : Transaction,targetTransaction : Transaction) {
      const db = await Database.getDB();
      const oldKey = new Date(originalTransaction.dateTime).toDateString();
      const key = new Date(targetTransaction.dateTime).toDateString();

      const oldData = await db.get(DatabaseStores.Finances, oldKey) as Transaction[] | undefined;
      if (oldData != undefined) {
         await db.put(DatabaseStores.Finances, oldData.filter(t => t.createdAt !== originalTransaction.createdAt), oldKey)
      }

      const newData = await db.get(DatabaseStores.Finances, key) as Transaction[] | undefined;
      if (newData != undefined) {
         await db.put(DatabaseStores.Finances, [...newData, targetTransaction], key)
      }

      db.close();
      return true;
   }
   //
   // Getters.
   //
   public static async GetTransactions() {
      const db = await Database.getDB();
      const keys = await db.getAllKeys(DatabaseStores.Finances);
      let transactions : {[key :string] : Transaction[] } = {};

      for (const key of keys) {
         const data = await db.get(DatabaseStores.Finances, key);
         if (data) {
            transactions[key as string] = data; // Add the array of transactions under the date key
         }
      }
   
      db.close();
      return transactions;
    }

}
