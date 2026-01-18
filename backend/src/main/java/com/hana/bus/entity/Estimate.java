package com.hana.bus.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

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

    
    protected Estimate() {}

    public Estimate(
            String purpose,
            Integer adultCount,
            Integer childCount,
            String luggageType
    ) {
        this.status = "requested";
        this.purpose = purpose;
        this.adultCount = adultCount;
        this.childCount = childCount;
        this.luggageType = luggageType;
    }


    public Long getId() {
        return id;
    }
}
