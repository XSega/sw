var myButton = document.querySelector('button');

myButton.onclick = function() {
    // createGist({
    //   description: 'Fetch API Post example',
    //   public: true
    // })
    fetchGithub();
}

registerSW();

function registerSW() {
    // Проверка того, что наш браузер поддерживает Service Worker API.
    navigator.serviceWorker.register('sw.js').then(function(registration) {
        sendMessage("ServiceWorker registration successful with scope: " + registration.scope);
    }, function(err) {
        sendMessage("ServiceWorker registration failed: " +  err);
    });
}

function fetchGithub() {
    console.log('Posting request to GitHub API...');
    fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits').then(function(response) {
        return response.json();
    }).then(function(data) {
        sendMessage("Created Gist:" + data.html_url);
    });
}

function createGist(opts) {
  console.log('Posting request to GitHub API...');
  fetch('https://api.github.com/gists', {
    method: 'post',
    body: JSON.stringify(opts)
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    sendMessage("Created Gist:" + data.html_url);
  });
}
