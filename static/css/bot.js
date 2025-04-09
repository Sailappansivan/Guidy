async function sendMessage() {
    var message = document.getElementById('user-message').value;
    if (message.trim() === "") return;

    // Display the user's message in the chat window
    var chatLog = document.getElementById('chat-log');
    var userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.textContent = message;
    chatLog.appendChild(userMessage);

    // Clear the input field
    document.getElementById('user-message').value = '';

    // Send the user's message to the Flask backend
    var response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    });

    // Check if response is okay
    if (response.ok) {
        // Parse the response from Flask
        var data = await response.json();
        var botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        botMessage.textContent = data.response;
        chatLog.appendChild(botMessage);

        // Scroll to the bottom of the chat log
        chatLog.scrollTop = chatLog.scrollHeight;
    } else {
        console.error("Error: Chatbot not responding");
    }
}
