package com.hana.bus.repository;

import com.hana.bus.entity.EstimateBusRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstimateBusRequestRepository extends JpaRepository<EstimateBusRequest, Long> {
}
