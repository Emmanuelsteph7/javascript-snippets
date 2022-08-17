const startBtn = document.getElementById("start");
const checkBtn = document.getElementById("check");
const matchBtn = document.getElementById("match");
const deleteBtn = document.getElementById("delete");

const cacheName = "assetCacheV1";

const startCaching = () => {
  // open a cache and save some responses
  caches.open(cacheName).then((cache) => {
    console.log(`Started Cache`);

    /**
     * we can add using url string, URL API Request object
     * irrespective of the one used, they are all saved as a request object
     */
    // we can add using string
    // using string this way, it appends the domain to the start of the string
    const urlString = "/javascript/codesnippets/cachesApi/img/blur-bg.png";
    cache
      .add(urlString)
      .then((value) => {
        console.log(value, "cache value");
      })
      .catch((err) => {
        console.log(err, "cache add error");
      });

    //   we can add using URL
    // adding  "http://127.0.0.1:5500/javascript/codesnippets/cachesApi/img/blur-bg.png"
    // will simply replace the previous one bcos its the same file
    // adding as small as a query string differentiates them

    const url = new URL(
      "http://127.0.0.1:5500/javascript/codesnippets/cachesApi/img/blur-bg.png?id=two"
    );
    cache.add(url);

    const req = new Request(
      "/javascript/codesnippets/cachesApi/img/blur-bg.png?id=three"
    );
    cache.add(req);

    // this returns an array of the requests in this cacheName
    cache.keys().then((keys) => {
      console.log(keys, "keys");
      //   we can loop over the keys and do what we want
    });

    // matchCache(cache);
  });
};

const checkCache = () => {
  // check if a cache exists
  caches
    .has(cacheName)
    .then((isFound) => {
      console.log(isFound, "cache status");
    })
    .catch((err) => console.log(err, "cache has error"));
};

const matchCache = () => {
  const urlToMatch = "/javascript/codesnippets/cachesApi/img/blur-bg.png";

  caches.open(cacheName).then((cache) => {
    caches.match(urlToMatch).then((cacheResponse) => {
      // we can do what we want
      // an example below
      if (
        cacheResponse &&
        cacheResponse.status < 400 &&
        cacheResponse.headers.has("content-type") &&
        cacheResponse.headers.get("content-type").match(/^image\//i)
      ) {
        console.log("found in the cache");
        console.log(cacheResponse, "from cache");
      } else {
        console.log("not found in the cache");
        fetch(urlToMatch).then((fetchResponse) => {
          if (!fetchResponse.ok) throw fetchResponse.statusText;

          // reaching here, we have a valid fetch
          // this is normally done in a service worker.
          // the fetched data can either be sent to the browser or stored in the cache, not both.
          // the way around this is to clone it, then return the response to the browser.
          cache.put(urlToMatch, fetchResponse);

          // to clone
          // cache.put(urlToMatch, fetchResponse.clone())
          console.log(fetchResponse, "fetch response");
        });
      }
    });
  });
};

const deleteCache = () => {
  const urlToDelete = "/javascript/codesnippets/cachesApi/img/blur-bg.png";

  // delete one response
  //   caches.open(cacheName).then((cache) => {
  //     cache.delete(urlToDelete).then((isDeleted) => console.log(isDeleted));
  //   });

  //   delete entire cache
  caches.delete(cacheName).then((isDeleted) => console.log(isDeleted));
};

startBtn.addEventListener("click", startCaching);
checkBtn.addEventListener("click", checkCache);
matchBtn.addEventListener("click", matchCache);
deleteBtn.addEventListener("click", deleteCache);
