using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using FinancesApp;
using FinancesApp.Components.Logic;
using TG.Blazor.IndexedDB;
using FinancesApp.Models;
using Microsoft.JSInterop;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });


builder.Services.AddBlazorBootstrap();


// sets up IndexedDB database.
builder.Services.AddIndexedDB(dbstore => {
    dbstore.DbName = "finances";
    dbstore.Version = 1;

    dbstore.Stores.Add(new() {
        Name = "Transactions",
        PrimaryKey = new IndexSpec { Name = "id", KeyPath = "id", Auto = true },
        Indexes = [
            new() {Name="Title", KeyPath="title", Auto=false},
            new() {Name="Category", KeyPath = "category", Auto=false},
            new() {Name="Ammount", KeyPath = "ammount", Auto=false},
            new() {Name="Date", KeyPath = "date", Auto=false},
            new() {Name="Time", KeyPath = "time", Auto=false},
        ]
    });
});


builder.Services.AddScoped<StorageHandler>(s => new StorageHandler(s.GetService<IJSRuntime>()! ) );
builder.Services.AddCascadingValue(s => CascadingValueSource.CreateNotifying<GlobalUserData>( new GlobalUserData( s.GetService<StorageHandler>()! )) );




await builder.Build().RunAsync();
