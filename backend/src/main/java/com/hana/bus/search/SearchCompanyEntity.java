package com.hana.bus.search;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bus_schedule_capacities")  // 같은 테이블 참조
public class SearchCompanyEntity {
  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long companyId;
    private LocalDate targetDate;
    private String busType;
    
    private String companyName;
    
    protected SearchCompanyEntity() {}
    
    public SearchCompanyEntity(
        Long companyId,
        LocalDate targetDate,
        String busType,
        String companyName
    ) {
        this.companyId = companyId;
        this.targetDate = targetDate;
        this.busType = busType;
        this.companyName = companyName;
    }

    public Long getId() {
        return id;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public String getBusType() {
        return busType;
    }

    public String getCompanyName() {
        return companyName;
    }

}