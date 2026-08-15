const CACHE = "sword-cauldron-v6";
const ASSETS = ["./", "./index.html", "./styles.css", "./ui-polish.css", "./character-ui.css", "./expansion.css", "./gameplay-fixes.css", "./app.js", "./start.js", "./character-ui.js", "./expansion.js", "./portrait-assets.js", "./gameplay-fixes.js", "./manifest.webmanifest", "./assets/portraits/human.png", "./assets/portraits/elf.png", "./assets/portraits/dwarf.png", "./assets/portraits/dragonkin.png"];

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
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
