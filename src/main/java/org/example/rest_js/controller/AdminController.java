package org.example.rest_js.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping
    public String showAdminPage() {
        return "admin_page";
    }

    @GetMapping("/new")
    public String showNewUserPage() {
        return "new_user_page";
    }
}
