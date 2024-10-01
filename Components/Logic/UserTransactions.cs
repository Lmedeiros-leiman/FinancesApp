using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

using FinancesApp.Models;

using TG.Blazor.IndexedDB;

namespace FinancesApp.Models {
    public class Transaction {
        public string id {get; set;} = "";
        public string Title {get; set;} = "";
        public double Ammount {get; set;}
        public string Category {get; set;} = "";
        public DateOnly Date {get; set;} = DateOnly.FromDateTime(DateTime.Now);
        public TimeOnly Time {get; set;} = TimeOnly.FromDateTime(DateTime.Now);
    }
}

namespace FinancesApp.Components.Logic {
    public class UserTransactions : INotifyPropertyChanged {
        public event PropertyChangedEventHandler? PropertyChanged;
        private readonly StorageHandler _storageHandler;
        public UserTransactions(StorageHandler storageHandler ) {
            _storageHandler = storageHandler;

            Task.Run(async () => {
                await this.GetTransactions();

            });
        }
        //
        //
        public ICollection<Transaction> Transactions {get; set;} = [];

        public void AddTransaction(Transaction newTransaction) { 
            
            // saves to the database.
            Task.Run(async () => {
                await _storageHandler.AddToDatabase<Transaction>(newTransaction, DatabaseTables.Transactions);
            });

            // adds to the list.
            Transactions.Add(newTransaction);

            OnPropertyChanged(nameof(Transactions));
        }

        private async Task GetTransactions() {
            this.Transactions = await _storageHandler.GetAllRecords<Transaction>(DatabaseTables.Transactions);
            OnPropertyChanged(nameof(this.Transactions));
        }

        public async Task DeleteTransaction(Transaction target) {
            Transactions.Remove(target);
            await _storageHandler.RemoveFromDatabase<Transaction>(target.id, DatabaseTables.Transactions);

        }
        
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
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName ?? string.Empty));
        }
    }
}