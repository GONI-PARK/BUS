package com.hana.bus.service.bus;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hana.bus.dto.bus.BusScheduleListRequestDto;
import com.hana.bus.dto.bus.BusScheduleListResponseDto;
import com.hana.bus.entity.bus.BusScheduleEntity;
import com.hana.bus.repository.bus.BusScheduleRepository;

@Service
public class BusScheduleService {

    private final BusScheduleRepository repository;

    public BusScheduleService(BusScheduleRepository repository) {
        this.repository = repository;
    }

    public List<BusScheduleListResponseDto> getBusScheduleList(
            BusScheduleListRequestDto request
    ) {
        List<BusScheduleListResponseDto> result = new ArrayList<>();

        List<BusScheduleEntity> entities =
                repository.findByBusType(request.getBusType());

        for (BusScheduleEntity entity : entities) {
            result.add(
                    new BusScheduleListResponseDto(
                            entity.getCompanyName(),
                            entity.getBusType(),
                            entity.getDeparture(),
                            entity.getArrival(),
                            entity.getOperationTime()
                    )
            );
        }

        return result;
    }

}
