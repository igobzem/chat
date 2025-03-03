package chat.dto;

import chat.WebSocketEventListener;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@org.springframework.stereotype.Controller
public class Controller {
    private static final Logger logger = LoggerFactory.getLogger(Controller.class);


    @RequestMapping("/login")
    public void index(HttpServletRequest request, Model model) {
        String username = (String) request.getSession().getAttribute("username");

        if (username == null || username.isEmpty()) {
            model.addAttribute("username", "Inna");;
        }
        logger.debug("model.attribute username="+model.getAttribute("username"));

    }
}
