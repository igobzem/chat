package chat;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class Controller {
    private static final Logger logger = LoggerFactory.getLogger(Controller.class);


    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/publicChat")
    public String sendMessage(String chatMessage) {
        return chatMessage;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/api/addUser")
    public void addUser(@RequestBody Map<String, String> payload) {
        String name = payload.get("content");
        logger.info("content "+name);
    }

    @PostMapping("/addUser")
    public void addUser1(@RequestBody Map<String, String> payload) {
        String name = payload.get("name");
        logger.info("name1 "+name);
    }
}
