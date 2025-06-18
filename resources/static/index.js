document.addEventListener('DOMContentLoaded', () => {
    console.log('loaded...');
    const sendUserNameBnt = document.getElementById('send-username-btn');
    const mes = document.getElementById('login');
    const inputMsg = document.getElementById('input-msg');
    const sendMsgBtn = document.getElementById('send-msg-btn');
    const messages = document.getElementById('messages');

    var stompClient = null;

    function connect() {
        console.log('connecting....');
        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }

    function onConnected() {
        // Subscribe to the Public Topic
        stompClient.subscribe('/topic/publicChat', onMessageReceived);
        console.log('connected');
    }

    function onError(error) {
        console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
    }

        function sendMessage(event) {
            const messageContent = inputMsg.value.trim();
                console.log("send "+messageContent);
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



  function hideDiv() {
    const div = document.getElementById('login');
    div.style.display = 'none';
    const container = document.getElementById('chat');
    container.style.display = 'flex';
    console.log("hide");

    const userNameElement = document.getElementById('input-username');
    const userName = userNameElement.value.trim();
    console.log("userName " + userName);
    const addUser = {
          content: userName
    };
    fetch("/api/addUser", {
        method: "POST",
        headers: {
              "Content-Type": "application/json"
    },
        body: JSON.stringify(addUser)
    })

  }
      function onMessageReceived(payload) {

          const message = JSON.parse(payload.body);
          console.log("receive "+message);
          const messageElement = document.createElement('div');
          messageElement.classList.add('message');
          messageElement.textContent = message.content;
          messages.appendChild(messageElement);
          messages.scrollTop = messages.scrollHeight;
      }


    sendMsgBtn.addEventListener('click', sendMessage);
    sendUserNameBnt.addEventListener('click', hideDiv);
    connect();
});
