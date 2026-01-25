package com.hana.bus.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana.bus.entity.Estimate;

public interface EstimateRepository extends JpaRepository<Estimate, Long> {
	
    List<Estimate> findByCompanyIdAndCreatedAtBetweenOrderByCreatedAtDesc(
    		Long companyId,
            LocalDateTime from,
            LocalDateTime to
    );
    
    Optional<Estimate> findByIdAndCompanyId(
            Long id,
            Long companyId
    );
}
