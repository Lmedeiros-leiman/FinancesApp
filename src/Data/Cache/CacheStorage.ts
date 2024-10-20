export default class CacheStorage {
   // Adds data to the cache with a timestamp for expiration
   public static async add(key: string, url: string, data: any, ttl: number) {
     const cache = await caches.open(key);
     const timestamp = Date.now();
 
     // Create an object with data and the expiration timestamp
     const cacheData = {
       data,
       expiry: timestamp + ttl * 1000, // TTL in seconds
     };
 
     await cache.put(url, new Response(JSON.stringify(cacheData), { status: 200 }));
   }
 
   // Retrieves data from the cache, automatically removes it if stale
   public static async get(key: string, url: string) {
     console.log(`Loading ${key} from cache...`);
     const cache = await caches.open(key);
     const response = await cache.match(url);
 
     if (!response) {
       console.log('Cache miss');
       return null;
     }
 
     const responseData = await response.json();
     const { data, expiry } = responseData;
 
     if (Date.now() > expiry) {
       console.log('Cache expired');
       await cache.delete(url); // Remove stale data
       return null;
     }
 
     return data;
   }
 
   // Removes a specific entry from the cache
   public static async remove(key: string, url: string) {
     const cache = await caches.open(key);
     await cache.delete(url);
   }
 
   // Clears the entire cache for a given key
   public static async clear(key: string) {
     await caches.delete(key);
   }
 }
 