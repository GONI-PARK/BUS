package com.hana.bus.dto.bus;

public class BusScheduleListRequestDto {

    private String date;      
    private String busType;

    public BusScheduleListRequestDto(String date, String dayOfWeek, String busType) {
        this.date = date;
        this.busType = busType;
    }

    public String getDate() {
        return date;
    }


    public String getBusType() {
        return busType;
    }
}
