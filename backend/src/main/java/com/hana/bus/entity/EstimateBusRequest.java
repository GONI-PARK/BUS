package com.hana.bus.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "estimate_bus_requests")
public class EstimateBusRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estimate_id", nullable = false)
    private Estimate estimate;

    private String busType;
    private Integer busCount;

    protected EstimateBusRequest() {}

    public EstimateBusRequest(
            Estimate estimate,
            String busType,
            Integer busCount
    ) {
        this.estimate = estimate;
        this.busType = busType;
        this.busCount = busCount;
    }
    
    public String getBusType() {
        return busType;
    }

    public Integer getBusCount() {
        return busCount;
    }

}
