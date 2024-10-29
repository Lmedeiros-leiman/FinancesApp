
export const JsonFetcher = async <T> (url: string, cachedTime : number = 1 * 1000 ) => {
   // cached time is measured in seconds.
   // first we check the cache for our request.
   const cache = await caches.open("CachedJsonRequests");
   const cachedResponse = await cache.match(url);

   if (cachedResponse) {
      const cachedTimeHeader = Number(cachedResponse.headers.get("x-cached-time"));
      const isStale = new Date().getTime() > cachedTimeHeader;
      console.log("Cache TIme: "+ cachedTimeHeader + "| Current Time: " + new Date().getTime() + "| Stale: " + isStale)
      if (isStale) {
         // Cache is stale; delete it
         console.log("Deleting cached data for", url);
         await cache.delete(url);
      } else {
         console.log(`Using cached data for ${url}`);
         return await cachedResponse.json() as T;
         
      }
      
   }

   // Fetch new data as cache was missing or stale
   console.log(`Fetching new data for ${url}`);
   const response = await fetch(url);
   

   if (response.ok) {
      const data = await response.json() as T;
      const headers = new Headers(response.headers);
      headers.append("x-cached-time", String(new Date().getTime() + cachedTime * 1000));
      console.log("Caching data for ", url);
      await cache.put(url, new Response(JSON.stringify(data), { headers }));

      return data;
   }

   return response;
}


