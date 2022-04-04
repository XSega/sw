var myButton = document.querySelector('button');
myButton.onclick = function() {
    fetchGithub();
}




function register() {
  window.addEventListener('load', () => {
    registerValidSW();
  });
}

function registerValidSW() {
	navigator.serviceWorker
		.register('sw.js')
		.then((registration) => {
			if (navigator.vendor === 'Apple Computer, Inc.') {
				sendMessage('Safari!!!!');
			}

			registration.onupdatefound = () => {
				const installingWorker = registration.installing;
				if (installingWorker == null) {
					return;
				}
				installingWorker.onstatechange = () => {
					if (installingWorker.state === 'installed') {
						if (navigator.serviceWorker.controller) {
							// At this point, the updated precached content has been fetched,
							// but the previous service worker will still serve the older
							// content until all client tabs are closed.
							sendMessage(
								'New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA.'
							);
						} else {
							// At this point, everything has been precached.
							// It's the perfect time to display a
							// "Content is cached for offline use." message.
							sendMessage('Content is cached for offline use.');
						}
					}
				};
			};
		})
		.catch((error) => {
			sendMessage('Error during service worker registration:', error);
		});
}

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
    fetch('super-chashkin://api.github.com/repos/javascript-tutorial').then(function(response) {
        return response.json();
    }).then(function(data) {
        sendMessage("fetchGithub:" + data);
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
    sendMessage("Created Gist:" + data);
  });
}

function sendMessage(message) {
  console.log(message);
  window.webkit.messageHandlers.notifications.postMessage(message);
}