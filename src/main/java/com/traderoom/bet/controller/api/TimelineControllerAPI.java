package com.traderoom.bet.controller.api;

import com.traderoom.bet.service.TimelineService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/timeline")
public class TimelineControllerAPI {
    private final TimelineService service;

    public TimelineControllerAPI(TimelineService service) {
        this.service = service;
    }

    @GetMapping("/page/{page}/{size}")
    public ResponseEntity<String> getPage(
            @PathVariable(value = "page") @Min(0) int page,
            @PathVariable(value = "size") @Min(10) @Max(50) int size
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAll(page, size));
    }

//    @GetMapping("/day/{day}")
    public ResponseEntity<String> getDay(@PathVariable(value = "day") @Min(0) long day) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAllByDay(day));
    }

//    @GetMapping("/date/{from}/{to}")
    public ResponseEntity<String> getFromTo(
            @PathVariable(value = "from") @Min(0) long from,
            @PathVariable(value = "to") @Min(0) long to
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAllBetween(from, to));
    }

//    @GetMapping("/round/{round}")
    public ResponseEntity<String> getByRoundId(
            @PathVariable(value = "round") @Min(0) long roundId
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAllByRoundId(roundId));
    }
}
