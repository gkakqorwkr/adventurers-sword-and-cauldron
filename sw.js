const CACHE = "sword-cauldron-v16";
const ASSETS = ["./", "./index.html", "./styles.css", "./ui-polish.css", "./character-ui.css", "./expansion.css", "./gameplay-fixes.css", "./portrait-customizer.css", "./regional-content.css", "./app.js", "./start.js", "./character-ui.js", "./expansion.js", "./portrait-assets.js", "./gameplay-fixes.js", "./portrait-customizer.js", "./regional-content.js", "./manifest.webmanifest"];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (event.request.method === "GET" && new URL(event.request.url).origin === self.location.origin) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
    return response;
  })));
});
