using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace FinancesApp.Components.Logic
{
    public enum ValidThemes {
        light,
        dark
    }
    public class UserStyle : INotifyPropertyChanged {
        public event PropertyChangedEventHandler? PropertyChanged;
        private readonly StorageHandler _storageHandler;
        public ValidThemes CurrentTheme { get; private set; } = ValidThemes.light;
        public UserStyle(StorageHandler storageHandler) {
            _storageHandler = storageHandler;
            
            // pulls theme from local storage asyncronously and 
            Task.Run(async () => {
                ValidThemes? savedTheme = await _storageHandler.GetLocalStorage<ValidThemes>("theme");
                if ( Enum.IsDefined(typeof(ValidThemes), savedTheme) ) {
                    SetTheme((ValidThemes)savedTheme);
                }
                // by default the system uses light theme.
            });
        }
        public void SetTheme(ValidThemes theme) {
            if (theme == CurrentTheme) return;
            CurrentTheme = theme;
            // saves to localstorage.
            Task.Run(async () => await _storageHandler.setLocalStorage("theme", theme));
            // notifies the app about the change.
            OnPropertyChanged(nameof(CurrentTheme));
        }


        protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = default) {
            PropertyChanged?.Invoke(this, new(propertyName));
        } 
    }
}