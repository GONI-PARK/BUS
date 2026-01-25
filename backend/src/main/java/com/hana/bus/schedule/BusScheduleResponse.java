package com.hana.bus.schedule;

import java.time.LocalDate;

public class BusScheduleResponse {

    private LocalDate date;
    private String busType;
    private int maxCount;
    private int reservedCount;
    private int remainingCount;

    public BusScheduleResponse(
        LocalDate date,
        String busType,
        int maxCount,
        int reservedCount
    ) {
        this.date = date;
        this.busType = busType;
        this.maxCount = maxCount;
        this.reservedCount = reservedCount;
        this.remainingCount = maxCount - reservedCount;
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

    public int getReservedCount() {
        return reservedCount;
    }

    public int getRemainingCount() {
        return remainingCount;
    }
}
