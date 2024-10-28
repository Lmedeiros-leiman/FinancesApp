import { openDB } from "idb";
import { Transaction } from "../Types/Transaction";

export enum DatabaseStores {
   // the equivalent of a table.
   Finances = "Finances",
}


export class Database {
   public static readonly DatabaseName: string = "Finances";
   public static readonly DatabaseVersion: number = 2; // pre alpha2 :3

   public static async getDB() {
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
   public static async UpdateTransaction(targetTransaction : Transaction) {
      const db = await Database.getDB();
      const key = new Date(targetTransaction.dateTime).toDateString();

      const existingData = await db.get(DatabaseStores.Finances, key) as Transaction[] | undefined;
      if (existingData != undefined) {
         await db.put(DatabaseStores.Finances, existingData.map(t => t.createdAt === targetTransaction.createdAt ? targetTransaction : t), key)
      } else {
         return false;
      }

      db.close();
      return true;
   }

}
