package com.traderoom.api.controller.api;

import com.traderoom.api.service.VictoryService;
import jakarta.validation.constraints.Min;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/victory")
public class VictoryControllerAPI {
    private final VictoryService service;

    public VictoryControllerAPI(VictoryService service) {
        this.service = service;
    }

    @GetMapping("/between/{from}/{to}")
    public ResponseEntity<String> getCountByBetween(
            @PathVariable(value = "from") @Min(0) long from,
            @PathVariable(value = "to") @Min(0) long to
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAllByBetween(from, to));
    }

    @GetMapping("/between/{from}/{to}/statistic")
    public ResponseEntity<String> getStatisticByBetween(
            @PathVariable(value = "from") @Min(0) long from,
            @PathVariable(value = "to") @Min(0) long to
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAllStatisticByBetween(from, to));
    }
    @GetMapping("/between/{from}/{to}/line")
    public ResponseEntity<String> getLineByBetween(
            @PathVariable(value = "from") @Min(0) long from,
            @PathVariable(value = "to") @Min(0) long to
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAllWithLineByBetween(from, to));
    }

//    @GetMapping("/day/{day}")
    public ResponseEntity<String> getByDay(
            @PathVariable(value = "day") @Min(0) long day
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAllByDay(day));
    }

//    @GetMapping("/day/{day}/statistic")
    public ResponseEntity<String> getStatisticByDay(
            @PathVariable(value = "day") @Min(0) long day
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAllStatisticByDay(day));
    }

//    @GetMapping("/hour/{hour}")
    public ResponseEntity<String> getByHour(
            @PathVariable(value = "hour") @Min(0) long hour
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAllByHour(hour));
    }

//    @GetMapping("/hour/{start}/{count}")
    public ResponseEntity<String> getByHourCount(
            @PathVariable(value = "start") @Min(0) long start,
            @PathVariable(value = "count") @Min(0) long count
    ) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(service.findAllByHourCount(start, count));
    }
}
