import { openDB } from "idb";
import { Transaction } from "../Types/Transaction";

export enum DatabaseStores {
   // the equivalent of a table.
   Finances = "Finances",
}


export class Database {
   public static readonly DatabaseName: string = "Finances";
   public static readonly DatabaseVersion: number = 1; // pre alpha :3

   public static async getDB() {
      return await openDB(Database.DatabaseName, Database.DatabaseVersion, {
         upgrade(db) {
            console.log("Updating database...")
            Object.keys(DatabaseStores).forEach(storeName => {
               db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            });

            console.log("Database updated!")
         }
      });
   }

}
