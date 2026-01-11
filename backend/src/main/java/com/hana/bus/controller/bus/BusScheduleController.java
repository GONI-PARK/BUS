package com.hana.bus.controller.bus;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hana.bus.dto.bus.BusScheduleInsertRequestDto;
import com.hana.bus.dto.bus.BusScheduleListRequestDto;
import com.hana.bus.dto.bus.BusScheduleListResponseDto;
import com.hana.bus.service.bus.BusScheduleService;

@RestController
public class BusScheduleController {

    private final BusScheduleService busScheduleService;

    public BusScheduleController(BusScheduleService busScheduleService) {
        this.busScheduleService = busScheduleService;
    }

    @GetMapping("/bus-schedules")
    public List<BusScheduleListResponseDto> getBusSchedules(BusScheduleListRequestDto request) {
        return busScheduleService.getBusScheduleList(request);
    }
    
    
    @PostMapping("/bus-schedules")
    public ResponseEntity<Void> insertBusSchedule(@RequestBody BusScheduleInsertRequestDto requestDto) {

        busScheduleService.insertBusSchedule(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}