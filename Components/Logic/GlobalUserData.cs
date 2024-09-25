using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;


using FinancesApp.Models;

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace FinancesApp.Components.Logic {
    public class GlobalUserData : INotifyPropertyChanged {
        public event PropertyChangedEventHandler? PropertyChanged;
        public GlobalUserData(StorageHandler storageHandler) {
            UserStyle = new(storageHandler);
            UserStyle.PropertyChanged += (sender, args) => OnPropertyChanged(args.PropertyName);
            
            //
            UserTransactions = new(storageHandler);
            
        }
        
        //
        // Defines the user visible theme.
        public UserStyle UserStyle {get; set;}
        //
        // Defines the user transactions.
        public UserTransactions UserTransactions {get; set;}
        
        
        
        protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = default) => PropertyChanged?.Invoke(this, new(propertyName));
    }
}