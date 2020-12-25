import fs from "fs";
import { readdirRecursively } from "./helpers/readdir";

export const sw = (name: string | undefined) => {
  if (!name) {
    console.log("Name is requried.");
    return;
  }

  const path = process.cwd();

  const currentDir = fs
    .readdirSync(path, { withFileTypes: true })
    .filter(file => !file.isDirectory())
    .map(file => `./${file.name}`);

  if (!currentDir.includes("./playcanvas-stable.min.js")) {
    console.log("Not found PlayCanvas files.");
    return;
  }
  const urls = [];

  urls.push(...currentDir);

  const assetsUrls = readdirRecursively("./files");

  urls.push(...assetsUrls);

  const urlsToChache = urls
    .map(i => i && `\t"${i}"`)
    .filter(i => i)
    .sort();

  const output = `
    var CACHE_NAME = '${name}';
    var urlsToCache = [
    ${urlsToChache.join(",\n")}
    ];
    
    self.addEventListener("install", function(event) {
      event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
          return cache.addAll(urlsToCache);
        })
      );
    });
    
    self.addEventListener('activate', function(event) {
      event.waitUntil(
        caches.keys().then(function(keys) {
              var promises = [];
              keys.forEach(function(cacheName) {
                if (cacheName != CACHE_NAME)
                  promises.push(caches.delete(cacheName));
              });
              return Promise.all(promises);
            }));
    });

    self.addEventListener('fetch', (event) => {
      event.respondWith(
        caches.match(event.request, {
          ignoreSearch: true
        }).then((response) => {
          if (response) {
            return response;
          }
          let fetchRequest = event.request.clone();
          return fetch(fetchRequest)
            .then((response) => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              let responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              return response;
            });
        })
      );
    });

    `;

  console.log(output);
  fs.writeFileSync("./serviceWorker.js", output);
};
