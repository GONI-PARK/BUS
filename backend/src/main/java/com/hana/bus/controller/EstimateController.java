package com.hana.bus.controller;

import com.hana.bus.dto.estimate.EstimateCreateRequestDto;
import com.hana.bus.service.EstimateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/estimates")
public class EstimateController {

    private final EstimateService estimateService;

    public EstimateController(EstimateService estimateService) {
        this.estimateService = estimateService;
    }

    @PostMapping
    public ResponseEntity<Void> create(
            @RequestBody EstimateCreateRequestDto request) {

        estimateService.create(request);
        return ResponseEntity.ok().build();
    }
}
