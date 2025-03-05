package chat.dto;

import chat.WebSocketEventListener;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@org.springframework.stereotype.Controller
public class Controller {
    private static final Logger logger = LoggerFactory.getLogger(Controller.class);


    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/publicChat")
    public String sendMessage(String chatMessage) {
        return chatMessage;
    }

}
