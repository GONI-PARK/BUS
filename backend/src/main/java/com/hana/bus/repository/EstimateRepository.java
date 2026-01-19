package com.hana.bus.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana.bus.entity.Estimate;

public interface EstimateRepository extends JpaRepository<Estimate, Long> {
	
    List<Estimate> findByCreatedAtBetweenOrderByCreatedAtDesc(
            LocalDateTime from,
            LocalDateTime to
    );
}
