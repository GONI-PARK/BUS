package com.hana.bus.repository;

import com.hana.bus.entity.EstimateContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstimateContactRepository extends JpaRepository<EstimateContact, Long> {
}
