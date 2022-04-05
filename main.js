var myButton = document.querySelector('button');
myButton.onclick = function() {
    fetchGithub();
}

function fetchGithub() {
    // sendMessage('Posting request to GitHub API...');
    // fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits').then(function(response) {
    //     return response.json();
    // }).then(function(data) {
    //     sendMessage("fetchGithub:" + data);
    // });
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits', true);
    xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onload = function () {
        console.log(xhr.responseURL); // http://example.com/test
    };
    xhr.send(null);
}

function sendMessage(message) {
  console.log(message);
  window.webkit.messageHandlers.notifications.postMessage(message);
}