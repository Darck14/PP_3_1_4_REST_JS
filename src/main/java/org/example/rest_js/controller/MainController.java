package org.example.rest_js.controller;


import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class MainController {


    @GetMapping("/admin")
    public String showMainPageForAdmin(SecurityContext sec, Model model) {
        model.addAttribute("user", sec.getAuthentication().getName());
        model.addAttribute("roles", sec.getAuthentication().getAuthorities());
        return "admin_page";
    }

    @GetMapping("/user")
    public String showMainPageForUser() {
        return "user_page";
    }

}
