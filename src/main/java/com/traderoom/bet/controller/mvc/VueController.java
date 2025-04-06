package com.traderoom.bet.controller.mvc;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.context.request.RequestContextHolder;

//@Controller
public class VueController {

    @GetMapping(value = {"/", "/{path:[^\\.]*}"})
    public String redirectToIndex() {
        System.out.println("Redirecting");
        return "forward:/index.html";
    }
}