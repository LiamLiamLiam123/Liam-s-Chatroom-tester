var username;
var socket = io();

function sendMessage() {
  var messageInput = document.getElementById("message");
  var message = messageInput.value.trim();
  
  if (message !== "") {
    if (!username) {
      var usernameInput = document.getElementById("username");
      username = usernameInput.value.trim();
      if (username === "") {
        alert("Please enter a username.");
        return;
      }
      usernameInput.disabled = true;
      usernameInput.placeholder = "Username: " + username;
      messageInput.focus();
    }

    socket.emit('chat message', { username: username, message: message });
    messageInput.value = "";
  }
}

socket.on('chat message', (msg) => {
  var chatBox = document.getElementById("chat-box");
  var messageElement = document.createElement("div");
  messageElement.textContent = msg.username + ": " + msg.message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
});
