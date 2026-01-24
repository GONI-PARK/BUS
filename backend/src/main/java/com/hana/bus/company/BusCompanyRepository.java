package com.hana.bus.company;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusCompanyRepository
        extends JpaRepository<BusCompany, Long> {

    Optional<BusCompany> findByLoginId(String loginId);
}
