document.getElementById("send-msg-btn").addEventListener("click", function (event) {
    let input = document.getElementById("input-msg");
    if (input.value !== "") {
        let messages = document.getElementById("messages");
        const newMessage = document.createElement("div");
        newMessage.textContent = input.value;
        newMessage.classList.add("message");
        messages.appendChild(newMessage);
        newMessage.scrollIntoView({"behavior": "smooth"});
        input.value = "";
    }
})
