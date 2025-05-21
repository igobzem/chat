document.addEventListener('DOMContentLoaded', () => {
    const inputMsg = document.getElementById('input-msg');
    const sendMsgBtn = document.getElementById('send-msg-btn');
    const messages = document.getElementById('messages');

    var stompClient = null;

    function connect() {
        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }

    function onConnected() {
    // Subscribe to the Public Topic
        stompClient.subscribe('/topic/publicChat', onMessageReceived);
    }


    function onError(error) {
        console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
    }

    function sendMessage(event) {
        const messageContent = inputMsg.value.trim();
        if (messageContent && stompClient) {
            const chatMessage = {
                content: messageContent,
                from: 'User' // Replace with actual user name if available
            };
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
            inputMsg.value = '';
        }
        event.preventDefault();
    }

    function onMessageReceived(payload) {
        const message = JSON.parse(payload.body);
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message.content;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    }

    sendMsgBtn.addEventListener('click', sendMessage);
    connect();
});