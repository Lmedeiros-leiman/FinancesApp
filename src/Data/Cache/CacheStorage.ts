
export default class CacheStorage {
   public static async add(key:string, url: string, data: any) {
      const CacheStorage = await caches.open(key);
      await CacheStorage.put(url, new Response(JSON.stringify(data),{status: 200}));
   }
   public static async get(key : string,  URL : string) {
      console.log(`Loading ${key} from cache...`);
      let cachedData = await caches.open(key);
      
      return await cachedData.match(URL);
   }
   public static async remove() {}
}