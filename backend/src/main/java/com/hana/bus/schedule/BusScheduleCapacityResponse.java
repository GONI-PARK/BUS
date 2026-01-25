package com.hana.bus.schedule;

import java.time.LocalDate;

public class BusScheduleCapacityResponse {

    private LocalDate date;
    private String busType;
    private int maxCount;

    public BusScheduleCapacityResponse(
        LocalDate date,
        String busType,
        int maxCount
    ) {
        this.date = date;
        this.busType = busType;
        this.maxCount = maxCount;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getBusType() {
        return busType;
    }

    public int getMaxCount() {
        return maxCount;
    }
}
