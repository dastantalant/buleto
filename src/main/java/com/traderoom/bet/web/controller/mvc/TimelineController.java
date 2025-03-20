package com.traderoom.bet.web.controller.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller

public class TimelineController {
    @GetMapping
    public String timeline(){
        return "timeline";
    }
}
