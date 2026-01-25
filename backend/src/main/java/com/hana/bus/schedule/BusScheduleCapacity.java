package com.hana.bus.schedule;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "bus_schedule_capacities")
public class BusScheduleCapacity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long companyId;

    private LocalDate targetDate;

    private String busType;

    private int maxCount;

    protected BusScheduleCapacity() {}

    public BusScheduleCapacity(
        Long companyId,
        LocalDate targetDate,
        String busType,
        int maxCount
    ) {
        this.companyId = companyId;
        this.targetDate = targetDate;
        this.busType = busType;
        this.maxCount = maxCount;
    }

    public void updateMaxCount(int maxCount) {
        this.maxCount = maxCount;
    }

    // ===== getters =====

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

    public int getMaxCount() {
        return maxCount;
    }
}
