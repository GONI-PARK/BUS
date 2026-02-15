package com.hana.bus.search;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SearchCompanyRepository
        extends JpaRepository<SearchCompanyEntity, Long> {

    @Query("SELECT new com.hana.bus.search.SearchCompanyEntity(" +
           "s.companyId, s.targetDate, s.busType, c.companyName) " +
           "FROM SearchCompanyEntity s " +
           "JOIN com.hana.bus.company.BusCompany c ON s.companyId = c.id " +
           "WHERE s.busType = :busType " +
           "AND s.targetDate BETWEEN :startDate AND :endDate")

    List<SearchCompanyEntity> findByBusTypeAndTargetDateBetween(
          @Param("busType") String busType,
          @Param("startDate") LocalDate startDate,
          @Param("endDate") LocalDate endDate
);
}
