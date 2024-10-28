
export const JsonFetcher = async <T = any>(url: string, cachedTime : number = 1 * 1000 ) => {
   // cached time is measured in seconds.
   // first we check the cache for our request.
   const cache = await caches.open("CachedJsonRequests");
   let CachedData = await cache.match(url);
   
   if (CachedData) {
      const isStale = Number(CachedData.headers.get("x-cached-time")) < new Date().getTime();

      if (isStale) { 
         await cache.delete(url);
      } else {
         console.log("Using cached data for " + url);
         return await CachedData.json() as T;
      }
   }

   const header = await fetch(url);
   const data = await header.json() as T;

   // make sure to only cache sucessfull responses!
   if (header.ok) {
      const newHeader = new Headers(header.headers)
      newHeader.append("x-cached-time", String(new Date().getTime() + cachedTime));

      await cache.put(url, new Response(JSON.stringify(data), { headers: newHeader } ));
   }
   
   
   return <T>data;
}


