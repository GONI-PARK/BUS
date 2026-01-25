package com.hana.bus.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hana.bus.dto.estimate.EstimateListItemDto;
import com.hana.bus.dto.estimate.response.EstimateDetailResponse;
import com.hana.bus.service.EstimateQueryService;
@RestController
@RequestMapping("/admin/estimates")
public class EstimateQueryController {

    private final EstimateQueryService estimateQueryService;

    public EstimateQueryController(EstimateQueryService estimateQueryService) {
        this.estimateQueryService = estimateQueryService;
    }

    @GetMapping("/{estimateId}")
    public ResponseEntity<EstimateDetailResponse> getDetail(
            @AuthenticationPrincipal Long companyId,
            @PathVariable("estimateId") Long estimateId) {

        return ResponseEntity.ok(
                estimateQueryService.getDetail(companyId, estimateId)
        );
    }

    @GetMapping
    public ResponseEntity<List<EstimateListItemDto>> getList(
            @AuthenticationPrincipal Long companyId,

            @RequestParam("fromDate")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate fromDate,

            @RequestParam("toDate")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate toDate
    ) {
        return ResponseEntity.ok(
                estimateQueryService.getList(companyId, fromDate, toDate)
        );
    }
}
    

