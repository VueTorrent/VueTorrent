const cacheName = 'VueTorrent-assets'
const urlsToCache = [/* REPLACE BY GENERATED ASSET LIST */]

async function precache() {
  const cache = await caches.open(cacheName);
  return cache.addAll(urlsToCache);
}

async function clearStaleCache() {
  return caches.delete(cacheName);
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clearStaleCache());
});
