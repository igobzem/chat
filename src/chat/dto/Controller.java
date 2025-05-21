package chat.dto;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;

@org.springframework.stereotype.Controller
public class Controller {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/publicChat")
    public Message sendMessage(@Payload Message chatMessage) {
        return chatMessage;
    }
}
