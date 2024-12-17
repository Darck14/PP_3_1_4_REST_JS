package org.example.rest_js.controller;

import org.example.rest_js.model.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping
    public String showAdminPage(@AuthenticationPrincipal User user, Model model) {
        model.addAttribute("user", user.getName());
        model.addAttribute("roles", user.getAuthorities());
        return "admin_page";
    }
}
