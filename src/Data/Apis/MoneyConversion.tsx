// utilizes fxratesapi for a currency conversion list.
// uses ts money to handle the rest.
// https://api.fxratesapi.com/latest

export interface MoneyConversionApiResponse {
   success: boolean;
   terms: string;
   privacy: string;
   timestamp: number;
   date: string;
   base: string;
   rates: { [key: string] : number };
 }


export default class MoneyConversionApi {

   public async getLatestRates() {
      // gets the cached exchange rates.
      const cachedRates = localStorage.getItem("rates");
      if (cachedRates) {
         const cachedData = JSON.parse(cachedRates) as MoneyConversionApiResponse;
         if ( new Date().getTime() > (cachedData.timestamp + 1000 * 60 * 8) ) {
            // if the cached data is older than 8 minutes, fetch a new one.
            console.log("Fetching cached exchange rates...");
            return cachedData;
         }
      }


      // Fetches data from the api.
      return await this.getExchangeRates();
   }
   private async getExchangeRates(Base: string = 'USD') {
      const response = await fetch(`https://api.fxratesapi.com/latest?base=${Base}`);
      const data = await response.json() as MoneyConversionApiResponse;

      
      if (data.success == false) {
         // we probably reached the rate limit.
         console.error("Failure trying to get exchange rates");
         console.log(data);
         return undefined;
      }

      // changes the timestamps to the specific minute the request was made.
      data.timestamp = new Date().getTime();
      data.date = new Date().toISOString();
      
      // caches it.
      localStorage.setItem("rates", JSON.stringify(data));
      return data;
   }
}