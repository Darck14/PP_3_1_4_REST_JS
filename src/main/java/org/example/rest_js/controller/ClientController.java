package org.example.rest_js.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class ClientController {

    @GetMapping
    public String showUserPage() {
        return "user_page";
    }
 }
