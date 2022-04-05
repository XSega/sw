var myButton = document.querySelector('button');
myButton.onclick = function() {
    fetchGithub();
}

function fetchGithub() {
    sendMessage('Posting request to GitHub API...');
    fetch('super-chashkin://api.github.com/repos/javascript-tutorial/en.javascript.info/commits').then(function(response) {
        return response.json();
    }).then(function(data) {
        sendMessage("fetchGithub:" + data);
    });
}

function sendMessage(message) {
  console.log(message);
  window.webkit.messageHandlers.notifications.postMessage(message);
}