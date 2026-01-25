package com.hana.bus.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "estimates")
public class Estimate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String purpose;

    @Column(name = "adult_count")
    private Integer adultCount;

    @Column(name = "child_count")
    private Integer childCount;

    @Column(name = "luggage_type", nullable = false)
    private String luggageType;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "company_id", nullable = false)
    private Long companyId;
    
    protected Estimate() {}

    public Estimate(
            Long companyId,
            String purpose,
            Integer adultCount,
            Integer childCount,
            String luggageType
    ) {
        this.companyId = companyId;
        this.status = "requested";
        this.purpose = purpose;
        this.adultCount = adultCount;
        this.childCount = childCount;
        this.luggageType = luggageType;
    }


    public Long getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public String getPurpose() {
        return purpose;
    }

    public Integer getAdultCount() {
        return adultCount;
    }

    public Integer getChildCount() {
        return childCount;
    }

    public String getLuggageType() {
        return luggageType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public Long getCompanyId() {
        return companyId;
    }
}
