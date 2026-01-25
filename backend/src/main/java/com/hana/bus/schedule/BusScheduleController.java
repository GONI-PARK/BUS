package com.hana.bus.schedule;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/bus-schedules")
public class BusScheduleController {

    private final BusScheduleService busScheduleService;
    private final BusScheduleCapacityRepository busScheduleCapacityRepository;

    public BusScheduleController(
        BusScheduleService busScheduleService,
        BusScheduleCapacityRepository busScheduleCapacityRepository
    ) {
        this.busScheduleService = busScheduleService;
        this.busScheduleCapacityRepository = busScheduleCapacityRepository;
    }

    /**
     * 등록 / 수정 (UPSERT)
     */
    @PutMapping
    public void upsert(
        @AuthenticationPrincipal Long companyId,
        @RequestBody BusScheduleUpsertRequest request
    ) {
        busScheduleService.upsertSchedule(
            companyId,
            request.getDate(),
            request.getBusType(),
            request.getMaxCount()
        );
    }

    /**
     * 조회 (가용 대수만)
     */
    @GetMapping
    public List<BusScheduleCapacity> getCapacities(
        @AuthenticationPrincipal Long companyId,
        @RequestParam("from") LocalDate from,
        @RequestParam("to") LocalDate to
    ) {
        return busScheduleCapacityRepository
            .findByCompanyIdAndTargetDateBetween(companyId, from, to);
    }
}
