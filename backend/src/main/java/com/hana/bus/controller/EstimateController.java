package com.hana.bus.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hana.bus.dto.estimate.EstimateCreateRequestDto;
import com.hana.bus.dto.estimate.EstimateListItemDto;
import com.hana.bus.service.EstimateService;

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

        estimateService.create(
            request.getCompanyId(),
            request
        );

        return ResponseEntity.ok().build();
    }

}



