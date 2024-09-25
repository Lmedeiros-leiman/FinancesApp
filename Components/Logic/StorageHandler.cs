using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using Microsoft.JSInterop;

namespace FinancesApp.Components.Logic {
    public class StorageHandler(IJSRuntime jSRuntime) {
        //
        // Local Storage Methods
        public async         //
        // Local Storage Methods
        Task
setLocalStorage<T>(string key, T value) {
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
        

    }
}