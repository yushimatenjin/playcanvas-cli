import fs from 'fs'
import { readdirRecursively } from './helpers/readdir'

export const sw = (name: string) => {
  if (!name) {
    console.log("Name is requried.");
    return;
  }

  const path = process.cwd();

  const currentDir = fs.readdirSync(path, { withFileTypes: true }).filter(file => !file.isDirectory())
    .map(file => `./${file.name}`);

    
  if (!currentDir.includes("./playcanvas-stable.min.js")) {
    console.log("Not found PlayCanvas files.");
    return;
  }
  const urls = [];

  urls.push(...currentDir);

  const assetsUrls = readdirRecursively("./files")

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
    
    self.addEventListener("fetch", function(event) {
      event.respondWith(
        caches.match(event.request, {
          ignoreSearch: true
        }).then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
      );
    });

    self.addEventListener('activate', function(evt) {
      evt.waitUntil(
        caches.keys().then(function(keys) {
              var promises = [];
              keys.forEach(function(cacheName) {
                if (cacheName != CACHE_NAME)
                  promises.push(caches.delete(cacheName));
              });
              return Promise.all(promises);
            }));
    });
    `;
  
    console.log(output)
  fs.writeFileSync("./serviceWorker.js", output);
};
