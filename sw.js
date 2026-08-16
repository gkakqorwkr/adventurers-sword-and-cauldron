const CACHE = "sword-cauldron-v26";
const ASSETS = ["./", "./index.html", "./styles.css", "./ui-polish.css", "./character-ui.css", "./expansion.css", "./gameplay-fixes.css", "./portrait-customizer.css", "./regional-content.css", "./progression.css", "./app.js", "./start.js", "./character-ui.js", "./expansion.js", "./portrait-assets.js", "./gameplay-fixes.js", "./portrait-customizer.js", "./regional-content.js", "./item-visuals.js", "./progression.js", "./assets/backgrounds/mistwood.png", "./assets/backgrounds/swamp.png", "./assets/backgrounds/prairie.png", "./assets/backgrounds/mine.png", "./assets/backgrounds/canyon.png", "./assets/towns/mistwood-town.png", "./assets/towns/swamp-town.png", "./assets/towns/prairie-town.png", "./assets/towns/mine-town.png", "./assets/towns/canyon-town.png", "./assets/portraits/beastfolk/wolf.png", "./assets/portraits/beastfolk/fox.png", "./assets/portraits/beastfolk/cat.png", "./assets/portraits/beastfolk/rabbit.png", "./assets/portraits/beastfolk/bear.png", "./assets/portraits/random/human-1.png", "./assets/portraits/random/human-2.png", "./assets/portraits/random/human-3.png", "./assets/portraits/random/elf-1.png", "./assets/portraits/random/elf-2.png", "./assets/portraits/random/elf-3.png", "./assets/portraits/random/dwarf-1.png", "./assets/portraits/random/dwarf-2.png", "./assets/portraits/random/dwarf-3.png", "./assets/foods/r71.png", "./assets/items/i56.png", "./manifest.webmanifest"];

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
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then(response => {
    if (new URL(event.request.url).origin === self.location.origin) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
    return response;
  }).catch(() => caches.match(event.request)));
});
