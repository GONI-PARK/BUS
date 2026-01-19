package com.hana.bus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hana.bus.entity.EstimateRoute;

@Repository
public interface EstimateRouteRepository extends JpaRepository<EstimateRoute, Long> {

	   List<EstimateRoute> findByEstimateIdOrderByRouteOrderAsc(Long estimateId);
}
