using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

using FinancesApp.Models;

namespace FinancesApp.Components.Logic {
    public class UserTransactions(StorageHandler storageHandler) : INotifyPropertyChanged {
        public event PropertyChangedEventHandler? PropertyChanged;
        public ICollection<Transaction> Transactions {get; set;} = [];
        
        /*
        public void AddTransactionToList(Transaction newTransaction) {
            
            UserTransactions.Add(newTransaction);
            // await storageService.SetItemAsync<Transaction>("" ,newTransaction ,CancellationToken.None);
            
        }
        public void EditTransaction() {}
        public void DeleteTransactionToList() {}
        public void GetSavedTransactionsToList() {
            Task.Run( () => {
                
            });
        }
        */
        protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = default) {
            PropertyChanged?.Invoke(this, new(propertyName));
        } 
    }
}