package com.traderoom.bet.web.controller.api;

import com.traderoom.bet.web.service.TimelineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TimelineControllerAPI {
    private final TimelineService service;

    public TimelineControllerAPI(TimelineService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<String> get() {
        return ResponseEntity.ok("Hello from API");
    }
}
