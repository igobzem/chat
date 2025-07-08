package chat;

import chat.dto.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class Controller {
    private static final Logger logger = LoggerFactory.getLogger(Controller.class);

    private List<Message> messages = new ArrayList<>();

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/publicChat")
    public Message sendMessage(@RequestBody Message message) {
        messages.add(message);
        logger.info("messages "+messages);
        return message;
    }

    @GetMapping("/api/getMessages")
    public List<Message> getMessages() {
        return messages;
    }
}
