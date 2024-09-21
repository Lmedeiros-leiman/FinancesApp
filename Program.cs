using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using FinancesApp;
using FinancesApp.Components.Logic;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

builder.Services.AddCascadingValue(s => CascadingValueSource.CreateNotifying<GlobalUserData>(new GlobalUserData() ));

builder.Services.AddBlazorBootstrap();

await builder.Build().RunAsync();
