package com.hana.bus.repository;

import com.hana.bus.entity.EstimateRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstimateRouteRepository extends JpaRepository<EstimateRoute, Long> {
}
