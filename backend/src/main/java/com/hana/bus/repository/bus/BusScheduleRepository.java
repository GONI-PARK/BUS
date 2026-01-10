package com.hana.bus.repository.bus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana.bus.entity.bus.BusScheduleEntity;

public interface BusScheduleRepository
        extends JpaRepository<BusScheduleEntity, Long> {

    List<BusScheduleEntity> findByBusType(String busType);
}
