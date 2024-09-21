using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Components;

namespace FinancesApp.Components.Logic
{
    public class GlobalUserData : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler? PropertyChanged;

        private string _currentTheme = "light";
        public string CurrentTheme { 
            get => _currentTheme; 
            set { _currentTheme = value; OnPropertyChanged(); }  
        }

        

        public void TogleTheme() {
            CurrentTheme = CurrentTheme == "light" ? "dark" : "light";
        }


        protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = default) => PropertyChanged?.Invoke(this, new(propertyName));
    }
}