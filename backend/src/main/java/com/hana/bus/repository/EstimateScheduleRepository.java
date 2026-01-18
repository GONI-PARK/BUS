package com.hana.bus.repository;

import com.hana.bus.entity.EstimateSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstimateScheduleRepository extends JpaRepository<EstimateSchedule, Long> {
}
