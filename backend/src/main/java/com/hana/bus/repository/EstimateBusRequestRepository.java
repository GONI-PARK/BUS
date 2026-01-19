package com.hana.bus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hana.bus.entity.EstimateBusRequest;

@Repository
public interface EstimateBusRequestRepository extends JpaRepository<EstimateBusRequest, Long> {

    List<EstimateBusRequest> findByEstimateId(Long estimateId);
}
