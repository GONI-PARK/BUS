package com.hana.bus.controller.bus;

import com.hana.bus.dto.bus.BusScheduleListRequestDto;
import com.hana.bus.dto.bus.BusScheduleListResponseDto;
import com.hana.bus.service.bus.BusScheduleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BusScheduleController {

    private final BusScheduleService busScheduleService;

    public BusScheduleController(BusScheduleService busScheduleService) {
        this.busScheduleService = busScheduleService;
    }

    @GetMapping("/bus-schedules")
    public List<BusScheduleListResponseDto> getBusSchedules(
        BusScheduleListRequestDto request
    ) {
        return busScheduleService.getBusScheduleList(request);
    }
}