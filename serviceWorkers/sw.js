console.log("service worker running... ");

const versionNo = 2;
const cacheVersion = `cache-version${versionNo}`;

const assets = [
  "/javascript/codesnippets/serviceWorkers/",
  "/javascript/codesnippets/serviceWorkers/index.html",
  "/javascript/codesnippets/serviceWorkers/css/styles.css",
  "/javascript/codesnippets/serviceWorkers/js/main.js",
];

self.addEventListener("install", (e) => {
  // service worker is installed
  console.log("service worker installed");

  // add items to the cache
  e.waitUntil(
    caches.open(cacheVersion).then((cache) => {
      cache
        .addAll(assets)
        .then(() => {
          console.log(`${cacheVersion} has been updated`);
        })
        .catch((err) => {
          // if the path to the file isn't correct, it will give an error
          console.log("err from install", err);
        });
    })
  );
});

self.addEventListener("activate", (e) => {
  // service worker is activated
  console.log("service worker activated");

  // we can delete outdated caches or do what we want
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.forEach((key) => {
          if (key !== cacheVersion) {
            caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  // service worker intercepted http request
  console.log("service worker intercepted a http request", e.request);
});

self.addEventListener("message", (e) => {
  // message from webpage
});
