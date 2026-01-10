package com.hana.bus.dto.bus;
public class BusScheduleListRequestDto {

    private String date;
    private String busType;

    public BusScheduleListRequestDto() {
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getBusType() {
        return busType;
    }

    public void setBusType(String busType) {
        this.busType = busType;
    }
}