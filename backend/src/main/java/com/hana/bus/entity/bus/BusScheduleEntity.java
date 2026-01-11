package com.hana.bus.entity.bus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bus_schedule")
public class BusScheduleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "bus_type")
    private String busType;

    private String departure;
    private String arrival;

    @Column(name = "operation_time")
    private String operationTime;

    protected BusScheduleEntity() {
        // JPA 기본 생성자
    }

    public BusScheduleEntity(
            String companyName,
            String busType,
            String departure,
            String arrival,
            String operationTime
    ) {
        this.companyName = companyName;
        this.busType = busType;
        this.departure = departure;
        this.arrival = arrival;
        this.operationTime = operationTime;
    }

    public Long getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getBusType() {
        return busType;
    }

    public String getDeparture() {
        return departure;
    }

    public String getArrival() {
        return arrival;
    }

    public String getOperationTime() {
        return operationTime;
    }
}
