package com.hana.bus.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hana.bus.entity.EstimateSchedule;

@Repository
public interface EstimateScheduleRepository extends JpaRepository<EstimateSchedule, Long> {
	
	Optional<EstimateSchedule> findByEstimateId(Long estimateId);

}
