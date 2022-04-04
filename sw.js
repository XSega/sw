
self.addEventListener('install', (event) => {
    sendMessage('Установлен');
});

self.addEventListener('activate', (event) => {
    sendMessage('Активирован');
});

self.addEventListener('fetch', (event) => {
    sendMessage("Происходит запрос на сервер" + event.request.body);
    event.respondWith(fetch(event.request))
});

function sendMessage(message) {
    console.log(message);
    window.webkit.messageHandlers.notifications.postMessage(message);
}

