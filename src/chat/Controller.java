package chat;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class Controller {
    private static final Logger logger = LoggerFactory.getLogger(Controller.class);

    private String userName;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/publicChat")
    public String sendMessage(String chatMessage) {
        return chatMessage;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/api/addUser")
    public void addUser(@RequestBody Map<String, String> payload) {
        String name = payload.get("content");
        userName = name;
        logger.info("content "+name);
    }


    @GetMapping("/api/getUser")
    public Map<String,String> getUser() {
        Map<String,String> result = new HashMap<>();
        result.put("from", userName);
        logger.info("from "+userName);
        return result;
    }

    @GetMapping("/api/getUserName")
    public String getUserName() {
        return userName;
    }

}
