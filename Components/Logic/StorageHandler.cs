using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using FinancesApp.Models;

using Microsoft.JSInterop;

using TG.Blazor.IndexedDB;

namespace FinancesApp.Components.Logic {
    public enum DatabaseTables {
        Transactions,
    }
    public class StorageHandler(IJSRuntime jSRuntime, IndexedDBManager dBManager) {
        //
        // Local Storage Methods
        public async Task SetLocalStorage<T>(string key, T value) {
            string stringfiedValue = JsonSerializer.Serialize(value);
            
            await jSRuntime.InvokeVoidAsync("localStorage.setItem", key, stringfiedValue);
            
        }
        public async Task<T?> GetLocalStorage<T>(string key) {
            string? value = await jSRuntime.InvokeAsync<string?>("localStorage.getItem", key);
            return value == null ? default : JsonSerializer.Deserialize<T>(value);
        }
        public async void RemoveLocalStorage(string key) {
            await jSRuntime.InvokeVoidAsync("localStorage.removeItem", key);
        }
        public async void ClearLocalStorage() {
            await jSRuntime.InvokeVoidAsync("localStorage.clear");
        }
        //
        // Index db Methods
        public async Task AddToDatabase<T>(T newTransaction, DatabaseTables table) {
            StoreRecord<T> newRecord = new() {
                Storename = table.ToString(),
                Data = newTransaction
            };

            await dBManager.AddRecord(newRecord);
        }
        
        
        public async Task RemoveFromDatabase<T>(T data, DatabaseTables table) {

        }
        public async Task AlterFromDatabase<T>(T oldData, T newData, DatabaseTables table)
        {
            StoreRecord<T> oldRecord = await dBManager.GetById<T>(oldData.ToString(), table);
            oldRecord.Data = newData;
            await dBManager.UpdateRecord(oldRecord);
        }
        // Query from database
        //
        public async Task<T?> GetById<T>(string id, DatabaseTables table)
        {
            StoreRecord<T> record = await dBManager.GetRecordById<T, T>(table.ToString(), id);
            return record.Data;
        }

        public async Task<T?> GetByIndex<T>(string index)
        {
            // Assuming you have a method in dBManager to get record by index
            StoreRecord<T> record = await dBManager.GetRecordByIndex<T, T>(StoreIndexQuery<T> index);
            return record.Data;
        }

        public async Task Clear(DatabaseTables store) => await dBManager.ClearStore(store.ToString());
        public async Task<ICollection<T>> GetAllRecords<T>(DatabaseTables store) => await dBManager.GetRecords<T>(store.ToString());
    }
}