package com.hana.bus.schedule;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BusScheduleCapacityRepository
extends JpaRepository<BusScheduleCapacity, Long> {
	
	Optional<BusScheduleCapacity> findByCompanyIdAndTargetDateAndBusType(Long companyId, LocalDate targetDate, String busType);
	
	List<BusScheduleCapacity> findByCompanyIdAndTargetDateBetween(Long companyId, LocalDate from, LocalDate to);
}
