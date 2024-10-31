
export const JsonFetcher = async <T> (url: string, cachedTime : number = 1 * 1000 ) => {
   // cached time is measured in seconds.
   // first we check the cache for our request.
   const cache = await caches.open("CachedJsonRequests");
   const cachedResponse = await cache.match(url);

   if (cachedResponse) {
      const cachedTimeHeader = Number(cachedResponse.headers.get("x-cached-time"));
      const isStale = new Date().getTime() > cachedTimeHeader;
      
      if (isStale) {
         // Cache is stale; delete it
         await cache.delete(url);
      } else {
         console.log("Fetched CACHED data for " + url)
         return await cachedResponse.json() as T;
         
      }
      
   }

   // Fetch new data as cache was missing or stale
   console.log(` Fetched NEW data for ${url}`);
   const response = await fetch(url);
   

   if (response.ok) {
      const data = await response.json() as T;
      const headers = new Headers(response.headers);
      headers.append("x-cached-time", String(new Date().getTime() + cachedTime * 1000));
      await cache.put(url, new Response(JSON.stringify(data), { headers }));

      return data;
   }

   return response;
}


