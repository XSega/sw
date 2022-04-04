
// self.addEventListener('install', (event) => {
//     sendMessage('Установлен');
// });

// self.addEventListener('activate', (event) => {
//     sendMessage('Активирован');
// });

// self.addEventListener('fetch', (event) => {
//     sendMessage("Происходит запрос на сервер" + event.request.body);
// });

var CACHE_VERSION = 1;

// Сокращённый идентификатор привязанный к определённой версии кеша.
var CURRENT_CACHES = {
  font: 'font-cache-v' + CACHE_VERSION
};

self.addEventListener('activate', function(event) {
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  // Активный воркер не будет рассматриваться как активированный, пока promise не разрешится успешно.
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCacheNames.indexOf(cacheName) == -1) {
            sendMessage("Deleting out of date cache: " + cacheName);

            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  sendMessage("Handling fetch event for " + event.request.url);

  event.respondWith(

    // Открывает объекты Cache, начинающиеся с 'font'.
    caches.open(CURRENT_CACHES['font']).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          sendMessage("Found response in cache:" + response);

          return response;
        }
      }).catch(function(error) {

        // Обрабатывает исключения от match() или fetch().
        sendMessage("Error in fetch handler: " + error);

        throw error;
      });
    })
  );
});

function sendMessage(message) {
    console.log(message);
    window.webkit.messageHandlers.notifications.postMessage(message);
}