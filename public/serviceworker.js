const staticCache = "site-static-v1";
const dynamicCache = "site-dynamic-v1";

const assets = [
  "index.html",
  "offline.html",
  "script/useSW.js",
  "images/Logo-offline.png",
];

self.addEventListener("install", (event) => {
  // console.log("serviceworker has been installed");
  event.waitUntil(
    caches.open(staticCache).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// Acivate service worker
self.addEventListener("activate", (event) => {
  // console.log("serviceworker has been activated");
  event.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keysfdsa);
      return Promise.all(
        keys
          .filter((key) => key !== staticCache && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  // console.log("fetch event", event);
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(event.request)
          // .then((fetchRes) => {
          //   return caches.open(dynamicCache).then((cache) => {
          //     cache.put(event.request.url, fetchRes.clone());
          //     return fetchRes;
          //   });
          // })//maybe use this later for runtime cache
          .catch(() => caches.match("offline.html"))
      );
    })
  );
});
