package com.hana.bus.schedule;

import java.time.LocalDate;

public class BusScheduleUpsertRequest {

    private LocalDate date;
    private String busType;
    private int maxCount;

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
