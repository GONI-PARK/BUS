package com.hana.bus.controller;

import com.hana.bus.dto.estimate.EstimateListItemDto;
import com.hana.bus.dto.estimate.response.EstimateDetailResponse;
import com.hana.bus.service.EstimateQueryService;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/estimates")
public class EstimateQueryController {

    private final EstimateQueryService estimateQueryService;

    public EstimateQueryController(EstimateQueryService estimateQueryService) {
        this.estimateQueryService = estimateQueryService;
    }

    @GetMapping("/{estimateId}")
    public ResponseEntity<EstimateDetailResponse> getDetail(
            @PathVariable("estimateId") Long estimateId) {

        return ResponseEntity.ok(
                estimateQueryService.getDetail(estimateId)
        );
    }

    @GetMapping
    public ResponseEntity<List<EstimateListItemDto>> getList(
            @RequestParam("fromDate")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate fromDate,

            @RequestParam("toDate")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate toDate
    ) {
        return ResponseEntity.ok(
                estimateQueryService.getList(fromDate, toDate)
        );
    }    
    
}
