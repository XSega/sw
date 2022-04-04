
self.addEventListener('install', (event) => {
    console.log('install');
});

self.addEventListener('activate', (event) => {
    console.log('activate');
});

self.addEventListener('fetch', (event) => {
    console.log("fetch " + event.request.body);

    // request is event.request sent by browser here 
    var request = event.request
    
    // разбираем URL
    const requestURL = new URL(event.request.url)

    // обрабатываем запросы к определенному хосту особым образом
    if (requestURL.hostname === 'api.github.com') {
        var req = new Request(request.url + "/en.javascript.info/commits", {
            method: "get",
            headers: request.headers,
            mode: request.mode, // need to set this properly
            credentials: request.credentials,
            redirect: 'manual'   // let browser handle redirects
        });
        event.respondWith(fetch(req))
        return
    }
    event.respondWith(fetch(event.request))
});
