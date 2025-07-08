document.addEventListener('DOMContentLoaded', () => {
    console.log('loaded...');
    const sendUserNameBnt = document.getElementById('send-username-btn');
    const mes = document.getElementById('login');
    const inputMsg = document.getElementById('input-msg');
    const sendMsgBtn = document.getElementById('send-msg-btn');
    const messages = document.getElementById('messages');

    var stompClient = null;
    var userName = null;

    function connect() {
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

        console.log("userName "+userName);
        if (messageContent && stompClient) {
            const chatMessage = {
                 content: messageContent,
                 from: userName
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
      const messages = document.getElementById('messages');
      messages.style.display = 'block';

      console.log("hide");

      const userNameElement = document.getElementById('input-username');
      userName = userNameElement.value.trim();
      fetch("/api/getMessages")
        .then(function(res) {
            return res.json()   // Convert the data into JSON
        })
        .then(function(data) {
            console.log(data);   // Logs the data to the console
            data.forEach(addMessage);
        })
        .catch(function(error) {
            console.log(err);   // Logs an error in case there is one
      });

    }
    function onMessageReceived(payload) {
          const message = JSON.parse(payload.body);
          addMessage(message);
    }

    function addMessage(message) {
          var messageContainer = document.createElement('div');
          messageContainer.classList.add('message-container');
          var sender = document.createElement('div');
          sender.classList.add('sender');
          sender.textContent = message.from;
          messageContainer.appendChild(sender);
          var date = document.createElement('div');
          date.classList.add('date');
          const currentDate = new Date();
          // Format options
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          // Convert to readable text
          const dateText = currentDate.toLocaleDateString('en-US', options);
          date.textContent = dateText;
          messageContainer.appendChild(date);
          var msg = document.createElement('div');
          msg.classList.add('message');
          msg.textContent = message.content;
          messageContainer.appendChild(msg);
          messages.appendChild(messageContainer);
          messages.scrollTop = messages.scrollHeight;
    }

    sendMsgBtn.addEventListener('click', sendMessage);
    sendUserNameBnt.addEventListener('click', hideDiv);
    connect();
});
