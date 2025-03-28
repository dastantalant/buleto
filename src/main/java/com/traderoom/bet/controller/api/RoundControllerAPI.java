package com.traderoom.bet.controller.api;

import com.traderoom.bet.service.RoundService;
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
@RequestMapping("/round")
public class RoundControllerAPI {

    private final RoundService service;

    public RoundControllerAPI(RoundService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<String> getPage(
            @RequestParam(value = "page", defaultValue = "0") @Min(0) int page,
            @RequestParam(value = "size", defaultValue = "10") @Min(10) @Max(100) int size
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAll(page, size));
    }

    @GetMapping("/day")
    public ResponseEntity<String> getDay(@RequestParam(value = "day", defaultValue = "0") @Min(0) long day) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAllByDay(day));
    }

    @GetMapping("/date")
    public ResponseEntity<String> getFromTo(
            @RequestParam(value = "from", defaultValue = "0") @Min(0) long from,
            @RequestParam(value = "to", defaultValue = "0") @Min(0) long to
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAllBetween(from, to));
    }

    @GetMapping("/{roundId}")
    public ResponseEntity<String> getByRoundId(
            @PathVariable(value = "roundId") @Min(0) long roundId
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAllByRoundId(roundId));
    }
}
