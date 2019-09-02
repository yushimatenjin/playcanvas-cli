import { execSync } from 'child_process';
import fs from 'fs';

export const sw = name => {
  if (!name) {
    console.log('Name is requried.');
    return;
  }
  const currentDir = execSync('ls -1')
    .toString()
    .split('\n');

  if (!currentDir.includes('playcanvas-stable.min.js')) {
    console.log('Not found PlayCanvas files.');
    return;
  }
  const urls = [];

  urls.push(...currentDir);

  const assestsDirectory = execSync('ls files/**/**/*/ -1');
  const assetsUrls = assestsDirectory
    .toString()
    .replace(/:\n/g, '')
    .split('\n\n')
    .map(i => i.replace(/\n/g, ''));

  urls.push(...assetsUrls);

  const urlsToChache = urls
    .map(i => i && `\t"${i}"`)
    .filter(i => i)
    .sort();

  const output = `
    var CACHE_NAME = ${name};
    var urlsToCache = [
    ${urlsToChache.join(',\n')}
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
        caches.match(event.request).then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
      );
    });
    `;

  fs.writeFileSync('./serviceWoker.js', output);
};
