package org.example.rest_js.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {


    @GetMapping("/admin")
    public String showMainPageForAdmin() {
        return "main_page";
    }

    @GetMapping("/user")
    public String showMainPageForUser() {
        return "main_page";
    }

}
