import redis from 'redis';

export const redisClient = redis.createClient({ url: process.env.REDIS_URL });

await redisClient.connect();

export async function cacheGet(key: string) {
  return await redisClient.get(key);
}

export async function cacheSet(key: string, data: any, ttl = 60) {
  await redisClient.set(key, JSON.stringify(data), { EX: ttl });
}


export async function deleteByKeys(keys: string[]) {
  return await redisClient.del(keys);
}
