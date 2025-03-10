var stompClient = null;

connect();

function appendMessage(text) {
    const messages = document.getElementById('messages');
    let div = document.createElement('div');
    div.className = 'message';
    div.appendChild(document.createTextNode(text));
    messages.appendChild(div);
    div.scrollIntoView({"behavior": "smooth"});
    return div;
}

function onClickSend() {
    let textArea = document.getElementById('input-msg');
    let text = textArea.value.trim();
    if (text) {
   //     let div = appendMessage(text);
        textArea.value = '';
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(text));
        console.log("send message..."+text);
    }

}

function onChatLoaded() {
    console.log("Chat is loading ...");
    document.getElementById('send-msg-btn').addEventListener('click', onClickSend);
    console.log("Chat is loaded....");
}

function connect() {
    if (stompClient == null) {
        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }
}

function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/publicChat', onMessageReceived);
    console.log("subscribe");

    // Tell your username to the server
//    stompClient.send("/app/chat.addUser",
//
//        {},
//        JSON.stringify({sender: username, type: 'JOIN'})
//    )

}

function onError(error) {
    console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    console.log("received "+ message);
    appendMessage(message);

//    var messageElement = document.createElement('li');
//
//    if(message.type === 'JOIN') {
//        messageElement.classList.add('event-message');
//        message.content = message.sender + ' joined!';
//    } else if (message.type === 'LEAVE') {
//        messageElement.classList.add('event-message');
//        message.content = message.sender + ' left!';
//    } else {
//        messageElement.classList.add('chat-message');
//        var usernameElement = document.createElement('strong');
//        usernameElement.classList.add('nickname');
//        var usernameText = document.createTextNode(message.sender);
//        var usernameText = document.createTextNode(message.sender);
//        usernameElement.appendChild(usernameText);
//        messageElement.appendChild(usernameElement);
//    }
//
//    var textElement = document.createElement('span');
//    var messageText = document.createTextNode(message.content);
//    textElement.appendChild(messageText);
//
//    messageElement.appendChild(textElement);
//
//    messageArea.appendChild(messageElement);
//    messageArea.scrollTop = messageArea.scrollHeight;
}
