package com.hana.bus.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hana.bus.entity.EstimateContact;

@Repository
public interface EstimateContactRepository extends JpaRepository<EstimateContact, Long> {

    Optional<EstimateContact> findByEstimateId(Long estimateId);
}
