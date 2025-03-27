package com.traderoom.bet.web.controller.api;

import com.traderoom.bet.web.service.TimelineQueryService;
import jakarta.validation.constraints.Min;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/timeline")
public class TimelineControllerAPI {
    private final TimelineQueryService service;

    public TimelineControllerAPI(TimelineQueryService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<String> getPage(
            @RequestParam(value = "page", defaultValue = "0") @Min(0) int page
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAll(page, 1000));
    }

    @GetMapping("/unix")
    public ResponseEntity<String> getDay(
            @RequestParam(value = "epoch", defaultValue = "0") @Min(0) long epoch
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAllByDate(epoch));
    }

}
